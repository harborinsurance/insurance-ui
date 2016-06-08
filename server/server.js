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
    async = require("async");
    

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');

dotenv.load();

let stripe = require("stripe")(process.env.STRIPE_API_KEY),
    twilio = new Twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_SECRET);

let appEnv = cfenv.getAppEnv();
let isProduction = process.env.NODE_ENV === "production";

app.use(bodyParser.json());

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
    //set initial application state
    request.body.status = "pending";
    request.body.submittedAt = new Date().toDateString();
    request.body.creditScore = getCreditScore();
    request.body.riskScore = getRiskScore();
    
    insertApplication(request.body, response);
});

app.put("/api/applications/:id", function (request, response) {
    if (request.body.status === "approved") {
        request.body.approvedAt = new Date().toDateString();
    }

    insertApplication(request.body, response);
});

app.post("/api/applications/:id/charge", function (request, response) {
    var charge,
        application;

    async.waterfall([
        function (next) {
            stripe.charges.create({
                amount: 500,
                currency: "usd",
                source: request.body.stripeToken,
                description: "Harbor Insurance Co. Insurance Policy"
            }, next);
        }, function (result, next) {
            charge = result;
            db.get(request.params.id, next);
        }, function (body, headers, next) {
            body.charge = charge;
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
    })
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
  app.get("/", function response(req, res) {
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

function sendText(status, phoneNumber, callback) {
    //remove spaces and dashes and other stuff
    phoneNumber = phoneNumber.replace(/\s/g, "").replace("-", "").replace(")", "").replace("(", "");

    //ensure it has the country code on it
    if (!phoneNumber.startsWith("+")) {
        phoneNumber = "+1" + phoneNumber;
    }

    let message = "";

    if (status === "pending") {
        message = "Thanks for submitting your application, we will get back to you soon!";
    }
    else if (status === "approved") {
        message = "Congrats!  Your application is approved!  We will be billing your credit card that you submitted with your application.";
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

function getCreditScore() {
    return getRandomNumber(300, 850);
}

function getRiskScore() {
    return getRandomNumber(0, 100);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function insertApplication(application, response) {
    var result;
    
    async.waterfall([
        function (next) {
            db.insert(application, next);
        },
        function (body, headers, next) {
            //this is actually id here, couch returns id on insert
            db.get(body.id, next);
        },
        function (body, headers, next) {
            result = body;

            if (result.status, result.phone) {
                sendText(result.status, result.phone, next);
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
    })
}
