var mongoose = require('mongoose');
var Chore = require('../app/models/chore');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);

describe('Chores', function() {
/*
  beforeEach(function(done) {
    Chore.remove({}, function(err) {
      done();
    });
  });
*/
  describe('/GET chore', function() {
    it('should return a list of chores (GET /chores)', function(done) {
      chai.request('https://chorescore-pljhll.c9users.io/api')
      .get('/chores')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json();
        res.body.should.be.a('array');
        done();
      });
    });
  })
});