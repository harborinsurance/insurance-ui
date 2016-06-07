"use strict";

let express = require("express"),
    path = require("path"),
    app = express(),
    dotenv = require("dotenv"),
    cfenv = require("cfenv"),
    Cloudant = require("cloudant"),
    _ = require("underscore"),
    bodyParser = require("body-parser"),
    stripe = require("stripe")(process.env.STRIPE_API_KEY),
    Twilio = require("twilio"),
    twilio = new Twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_ACCOUNT_TOKEN);

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');

dotenv.load();

let appEnv = cfenv.getAppEnv();
let isProduction = process.env.NODE_ENV === "production";

app.use(bodyParser.json());

let cloudantCreds = appEnv.getServiceCreds("cloudant"),
    dbName = "applications";

app.get("/api/applications", function (request, response) {
    // TODO db not defined
    db.view("applications", "all", function(error, body) {
        if (!error) {
            response.json(body.rows);
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
    db.insert(request.body, function (error, result) {
        if (error) {
            response.send(error);
        }
        else {
            response.json(result);
            if (request.body.status, request.body.mobile) {
                sendText(request.body.status, request.body.mobile);
            }
        }
    });
});

app.put("/api/applications/:id", function (request, response) {
    db.insert(request.body, function (error, result) {
        if (error) {
            response.send(error);
        }
        else {
            response.json(result);
            if (request.body.status && request.body.mobile) {
                sendText(request.body.status,request.body.mobile);
            }
        }
    });
});

app.post("/api/charge", function (request, response) {
    let charge = stripe.charges.create({
        amount: 1000, // amount in cents, again
        currency: "usd",
        source: stripeToken,
        description: "Example charge"
    }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
            response.send(error);
        }
        else {
            response.send(charge);
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
  app.use(express.static(__dirname + "/static"));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'static/index.html'));
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

function sendText(status, phoneNumber) {
    //remove spaces and dashes and other stuff
    phoneNumber = phoneNumber.replace(/\s/g, "").replace("-", "").replace(")", "").replace("(", "");

    //ensure it has the country code on it
    //TODO this is on USA phone numbers
    if (phoneNumber.startsWith("+1")) {
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
    }, function(err, message) {
        if(err) {
            console.error(err.message);
        }
    });
}

function seedDB(callback) {
    // TODO :: define db
  db = cloudant.use(dbName);

  // TODO :: define async
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
