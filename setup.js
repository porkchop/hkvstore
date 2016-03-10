'use strict';

var loki = require('lokijs');
var program = require('commander');

var createDatabase = (fileName, cb) => {
  var db = new loki(fileName);
  db.addCollection('hashes');
  db.save((err) => {
    if(err) {
      console.log(err);
      process.exit(1);
    }

    console.log(fileName + ' initialized.');
    process.exit(0);
  });
};

program
  .usage('-d <dbname.json>')
  .option('-d --db <dbname.json>', 'A name for the db file', createDatabase)
  .parse(process.argv);
