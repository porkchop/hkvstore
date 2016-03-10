'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var app = express();
app.use(bodyParser.json());

app.get('/:hash', (req, res) => {
  var entry = app.db
    .getCollection('hashes')
    .findOne({'hash': req.params.hash});
  if(entry) {
    res.status(200).json(entry.json);
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

  var hashes = app.db.getCollection('hashes');
  var entry = hashes.findOne({'hash': hash});
  if(entry) {
    entry.json = json; // Hash collision?? VERY unlikely, but just in case, let's set it with the latest json.
    hashes.update(entry);
  } else {
    hashes.insert({
      'hash': hash,
      'json': json
    });
  }

  res.status(201).json({
    hash: hash
  });
});

module.exports = app;
