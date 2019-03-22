import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);

const { expect } = chai;

describe('Handle requests on other endpoints', () => {
  it('should return a welcome message', done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Welcome to EPIC-mail');
        done(err);
      });
  });

  it('should return a welcome message for version 2 of the API', done => {
    chai
      .request(app)
      .get('/api/v2')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.be.equal('Welcome to EPIC-mail API version 2');
        done(err);
      });
  });

  it('should return an error 404 for all invalid url', done => {
    chai
      .request(app)
      .get('/api/v2/ukih/ghjhg')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error').equal(
          'The requested url was not found on this server',
        );
        done(err);
      });
  });
});
