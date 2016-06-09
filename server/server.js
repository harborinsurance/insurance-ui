"use strict";

let express = require("express"),
    path = require("path"),
    app = express(),
    dotenv = require("dotenv"),
    cfenv = require("cfenv"),
    Cloudant = require("cloudant"),
    _ = require("underscore"),
    bodyParser = require("body-parser"),
    Twilio = require("twilio"),
    async = require("async"),
    restler = require("restler");

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');

dotenv.load();

let twilio = new Twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_SECRET);

const stripeURL = "https://cnc-us-prd-pxy-01.integration.ibmcloud.com/nr-cmwalker-devadvoc-harborin-1465419110688/Stripe/charge",
    creditScoreURL = "https://cnc-us-prd-pxy-01.integration.ibmcloud.com/nr-cmwalker-devadvoc-harborin-1465419039433/Credit/score",
    leadsURL = "https://cnc-us-prd-pxy-01.integration.ibmcloud.com/nr-cmwalker-devadvoc-harborin-1465431459552/CRM/leads/";

let appEnv = cfenv.getAppEnv();
let isProduction = process.env.NODE_ENV === "production";

app.use(bodyParser.json());
app.use(bodyParser.text());

let cloudantCreds = appEnv.getServiceCreds("cloudant"),
    dbName = "applications",
    cloudant,
    db;

app.get("/api/applications", function (request, response) {
    db.view("applications", "all", function(error, body) {
        if (!error) {
            //remove nested object

            var applications = [];
            _.each(body.rows, function(application) {
                applications.push(application.value);
            });
            response.json(applications);
        }
        else {
            response.send(error);
        }
    });
});

app.get("/api/applications/:id", function (request, response) {
    db.get(request.params.id, function(error, body) {
        if (!error) {
            response.json(body);
        }
        else {
            response.send(error);
        }
    });
});

app.post("/api/applications", function (request, response) {
    var json;
    //dirty trick to force json parsing, dreamface only sends it as text
    try
    {
        json = JSON.parse(request.body);
    }
    catch(e)
    {
        json = request.body;
    }

    //set initial application state
    json.status = "pending";
    json.submittedAt = new Date();

    restler.get(creditScoreURL, {headers: {"X-IBM-CloudInt-ApiKey": process.env.CREDIT_API_KEY}}).on("complete", function(data) {
        json.creditScore = data.creditScore;
        json.riskScore = data.riskScore;
        insertApplication(json, response);
    });
});

app.put("/api/applications/:id", function (request, response) {

    var json;
    //dirty trick to force json parsing, dreamface only sends it as text
    try
    {
        json = JSON.parse(request.body);
    }
    catch(e)
    {
        json = request.body;
    }

    if (json.status === "approved") {
        json.approvedAt = new Date().toDateString();
    }
    db.get(request.params.id, function(error, body, headers) {
        if (error) {
            response.send(error);
        }
        else {
            json["_id"] = body["_id"];
            json["_rev"] = body["_rev"];
            insertApplication(json, response);
        }
    });
});

app.post("/api/applications/:id/charge", function (request, response) {
    var charge,
        application;

    async.waterfall([
        function (next) {
           restler.post(stripeURL, {data: request.body, headers: {"X-IBM-CloudInt-ApiKey": process.env.STRIPE_API_KEY}}).on("complete", function(data) {
               charge = data;
               next(null);
           });
        }, function (next) {
            db.get(request.params.id, next);
        }, function (body, headers, next) {
            body.charge = charge;
            body.paid = true;
            db.insert(body,  next);
        }, function (body, headers, next) {
            db.get(request.params.id, next);
        },
        function (body, headers, next) {
            application = body;
            next(null);
        }
    ], function(error) {
        if (error) {
            response.send(error);
        }
        else {
            response.json(application);
        }
    });
});

if (!isProduction) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'static/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + "/../static"));
  app.get("*", function response(req, res) {
    res.sendFile(path.join(__dirname, '../static/index.html'));
  });
}


let port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("server started on port " + port);
  let dbCreated = false;
  Cloudant({account:cloudantCreds.username, password:cloudantCreds.password}, function(er, dbInstance) {
      cloudant = dbInstance;
      if (er) {
          return console.log('Error connecting to Cloudant account %s: %s', cloudantCreds.username, er.message);
      }

      console.log('Connected to cloudant');
      cloudant.ping(function(er, reply) {
          if (er) {
              return console.log('Failed to ping Cloudant. Did the network just go down?');
          }

          console.log('Server version = %s', reply.version);
          console.log('I am %s and my roles are %j', reply.userCtx.name, reply.userCtx.roles);

          cloudant.db.list(function(er, all_dbs) {
              if (er) {
                  return console.log('Error listing databases: %s', er.message);
              }

              _.each(all_dbs, function(name) {
                  if (name === dbName) {
                      dbCreated = true;
                  }
              });
              if (dbCreated === false) {
                  cloudant.db.create(dbName, seedDB);
              }
              else {
                  db = cloudant.db.use(dbName);
                  console.log("DB", dbName, "is already created");
              }
          });
      });
  });
});


function sendText(application, callback) {
    //remove spaces and dashes and other stuff
    let phoneNumber = application.phone,
        status = application.status,
        id = application._id;
    phoneNumber = phoneNumber.replace(/\s/g, "").replace("-", "").replace(")", "").replace("(", "");

    //ensure it has the country code on it
    if (!phoneNumber.startsWith("+")) {
        phoneNumber = "+1" + phoneNumber;
    }

    let message = "";

    if (status === "pending") {
        message = `Thanks for submitting your application, you can check the status here http://harborinsurance.mybluemix.net/#/applications/${application._id}`;
    }
    else if (status === "approved") {
        message = `Congrats!  Your application is approved!  Please review your policy and submit payment here: http://harborinsurance.mybluemix.net/#/applications/${application._id}`;
    }
    else if (status === "rejected") {
        message = "Your application has been rejected.  Please contact customer service for more information";
    }

    twilio.messages.create({
        body: message,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER
    }, callback);
}

function seedDB(callback) {
  db = cloudant.use(dbName);

  async.waterfall([
    function (next) {
      let designDocs = [
          {
            _id: '_design/applications',
            views: {
              all: {
                map: function (doc) { emit(doc._id, doc); }
              }
            }
          }
     ];

      async.each(designDocs, db.insert, next);
    },
    function (next) {
      console.log("Created DB", dbName, "and populated it with initial purchases");
      next();
    }
], callback);
}

function insertApplication(application, response) {
    var result,
        noText = false;

    async.waterfall([
        function (next) {
            if (application.status === "pending" && application["_id"] === undefined) {
                restler.post(leadsURL, {data: application, headers: {"X-IBM-CloudInt-ApiKey": process.env.LEADS_API_KEY}}).on("complete", function(data) {
                    next(null, data);
                });
            }
            else if (application.lead === undefined || application.lead === null) {
                next(null, null);
            }
            else {
                restler.put(leadsURL + application.lead.LEAD_ID, {data: application, headers: {"X-IBM-CloudInt-ApiKey": process.env.LEADS_API_KEY}}).on("complete", function(data) {
                    if (application.status === "pending") {
                        noText = true;
                    }
                    next(null, data);
                });
            }
        },
        function (lead, next) {
            application.lead = lead;
            db.insert(application, next);
        },
        function (body, headers, next) {
            //this is actually id here, couch returns id on insert
            db.get(body.id, next);
        },
        function (body, headers, next) {
            result = body;
            if (result.status && result.phone && noText === false) {
                sendText(result, next);
            }
            else {
                next(null, null);
            }
        }, function (message, next) {
            next(null, result);
        }
    ], function(error) {
        if (error) {
            response.send(error);
        }
        else {
            response.json(result);
        }
    });
}
