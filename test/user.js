const mongoose = require("mongoose");
const User = require('../server/models/user');
const listen = require('../app').listen;
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);
describe('Users', () => {
  beforeEach((done) => {
    User.remove({}, (err) => {
      done();
    });
  });
  after((done) => {
    mongoose.models = {};
    mongoose.modelSchemas = {};
    listen.close();
    mongoose.connection.close(function () {
      console.log('Mongoose default connection disconnected through app termination');
    });
    done();
  });
  describe('/GET all users', () => {
    it('it should GET all the users', (done) => {
      chai.request(listen)
        .get('/users/all')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  describe('/POST register users', () => {
    it('it should POST to register users', (done) => {
      let newUser = new User({
        name: 'flukky',
        email: 'caiizilaz@gmail.com',
        username: 'caiizilaz',
        password: '1234'
      });
      chai.request(listen)
        .post('/users/register')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql(true);
          done();
        });
    });
  });
});