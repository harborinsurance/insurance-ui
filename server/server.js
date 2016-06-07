var express = require("express"),
    app = express(),
    dotenv = require("dotenv"),
    cfenv = require("cfenv"),
    Cloudant = require("cloudant"),
    _ = require("underscore"),
    bodyParser = require("body-parser");
    
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');

dotenv.load();

var appEnv = cfenv.getAppEnv();
var isProduction = process.env.NODE_ENV === "production";

app.use(bodyParser.json());

var cloudantCreds = appEnv.getServiceCreds("cloudant"),
    dbName = "applications";

app.get("/api/currentTime", function (request, response) {
  response.send({ time: new Date() });
});

app.get("/api/applications", function (request, response) {
    db.view("applications", "all", function(error, body) {
        if (!error) {
            response.json(body.rows);
        }
        else {
            response.error(error);
        }
    });
});

app.post("/api/applications", function (request, response) {
    db.insert(request.body, function (error, result) {
        if (error) {
            response.error(error);
        }
        else {
            response.json(result);
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


var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("server started on port " + port);
  var dbCreated = false;
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

function seedDB(callback) {
  db = cloudant.use(dbName);

  async.waterfall([
    function (next) {
      var designDocs = [
          {
            _id: '_design/applications',
            views: {
              all: {
                map: function (doc) { emit(doc._id, doc) }
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
  ], callback)
}
