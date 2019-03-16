import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);

const { expect } = chai;

describe('/POST Messages route', () => {
  it('should return an error if SUBJECT field characters is greater than 255', done => {
    const message = {
      subject: `lorem ipsum tities lorem ipsum tities lorem ipsum tities lorem ipsum tities
        lorem ipsum tities lorem ipsum tities lorem ipsum tities lorem ipsum tities lorem ipsum
        lorem ipsum titieslorem ipsum titieslorem ipsum titieslorem ipsum titieslorem ipsum tities`,
      message: 'Yep, It is here',
    };
    chai
      .request(app)
      .post('/api/v2/messages')
      .send(message)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql(`subject contains ${message.subject.length} characters, cannot be greater than 255`);
        done(err);
      });
  });

  it('should return an error if MESSAGE field is empty', done => {
    const message = {
      subject: 'Election News',
      message: '',
    };
    chai
      .request(app)
      .post('/api/v2/messages')
      .send(message)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('message field cannot be empty');
        done(err);
      });
  });

  it('should create a message if details are valid', done => {
    const message = {
      subject: 'Election News',
      message: 'Buhari has been re-elected, PMB is on for second term',
    };
    chai
      .request(app)
      .post('/api/v2/messages')
      .send(message)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('subject')
          .eql(message.subject);
        expect(res.body.data).to.have.property('status');
        done(err);
      });
  });
});

describe('/GET Messages routes', () => {
  it('should fetch all received emails', done => {
    chai
      .request(app)
      .get('/api/v2/messages')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.property('subject');
        expect(res.body.data[0]).to.have.property('message');
        expect(res.body.data[0]).to.have.property('status').eql('unread');
        done(err);
      });
  });
});
