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

  it('should fetch all unread received emails', done => {
    chai
      .request(app)
      .get('/api/v2/messages/unread')
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

  it('should fetch all sent emails', done => {
    chai
      .request(app)
      .get('/api/v2/messages/sent')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.property('subject');
        expect(res.body.data[0]).to.have.property('message');
        expect(res.body.data[0]).to.have.property('status').eql('sent');
        done(err);
      });
  });

  it('should return an error if id is invalid', done => {
    const message = {
      id: 'tt',
    };
    chai
      .request(app)
      .get(`/api/v2/messages/${message.id}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('The given id is invalid');
        done(err);
      });
  });

  it('should return an error if message does not exist', done => {
    const message = {
      id: 177,
    };
    chai
      .request(app)
      .get(`/api/v2/messages/${message.id}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Message record does not exist');
        done(err);
      });
  });

  it('should fetch a specific email record', done => {
    const message = {
      id: 1,
    };
    chai
      .request(app)
      .get(`/api/v2/messages/${message.id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.property('subject');
        expect(res.body.data[0]).to.have.property('message');
        expect(res.body.data[0]).to.have.property('status');
        done(err);
      });
  });
});

describe('/DELETE Messages route', () => {
  it('should return an error if id is invalid', done => {
    const message = {
      id: 'tt',
    };
    chai
      .request(app)
      .delete(`/api/v2/messages/${message.id}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('The given id is invalid');
        done(err);
      });
  });

  it('should return an error if message does not exist', done => {
    const message = {
      id: 177,
    };
    chai
      .request(app)
      .delete(`/api/v2/messages/${message.id}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Message record does not exist');
        done(err);
      });
  });

  it('should delete a specific email record', done => {
    const message = {
      id: 1,
    };
    chai
      .request(app)
      .delete(`/api/v2/messages/${message.id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data[0]).to.have.property('message')
          .eql('Message record has been deleted');
        done(err);
      });
  });
});
