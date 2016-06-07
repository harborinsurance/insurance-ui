var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static'));

app.get('/api/currentTime', function(req, res) {
  res.send({ time: new Date() });
});

app.listen(process.env.PORT || 8080);