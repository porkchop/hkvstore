var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var app = express();
app.use(bodyParser.json());

app.db = {};  // Dead simple database

app.get('/:hash', (req, res) => {
  var json = app.db[req.params.hash];
  if(json) {
    res.status(200).json(json);
  } else {
    res.status(404).json({
      'description': 'Hash-JSON pair not found.'
    });
  }
});

app.post('/', (req, res) => {
  var json = req.body;
  var hash = crypto.createHash('sha256')
    .update(JSON.stringify(json))
    .digest('hex');

  app.db[hash] = json;
  res.status(201).json({
    hash: hash
  });
});

module.exports = app;
