'use strict';

var app = require('./app');
var http = require('http');
var loki = require('lokijs');

app.db = new loki('./db.json', {'autosave': true});

app.db.loadDatabase({}, (err) => {
  if(err) {
    console.error('Failed to load db', err);
    process.exit(1);
  }

  var server = http.createServer(app);
  server.listen(3000, () => {
    console.log('hkvstore server listening on port ' + server.address().port);
  });
});
