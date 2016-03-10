'use strict';

var request = require('supertest');
var should = require('should');
var app = require('./app.js');
var crypto = require('crypto');
var loki = require('lokijs');

app.db = new loki('test-db.json');

describe('hkvstore', () => {
  before(function(done) {
    app.db.loadDatabase({}, done);
  });

  beforeEach(function() {
    app.db
      .getCollection('hashes')
      .removeWhere(() => {return true;}); // Clear the db
  });

  it('should get the correct json for a value that is set', (done) => {
    var json = {
      'This is': 'JSON'
    };
    var hash = crypto.createHash('sha256')
      .update(JSON.stringify(json))
      .digest('hex');

    // Let's set the JSON
    request(app)
      .post('/')
      .send(json)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, {
        'hash': hash
      }, (err) => {
        should.not.exist(err);
        // Let's confirm that it is there
        request(app)
          .get('/' + hash)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, json, done);
      });
  });

  it('should not get any data for a value that is not set', (done) => {
    var json = {
      'This is': 'JSON'
    };
    var hash = crypto.createHash('sha256')
      .update(JSON.stringify(json))
      .digest('hex');

    request(app)
      .get('/' + hash)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, {
        'description': 'Hash-JSON pair not found.'
      }, done);
  });
});
