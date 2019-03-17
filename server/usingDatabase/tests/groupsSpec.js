import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);

const { expect } = chai;

let userToken;

describe('/POST Group route', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/v2/auth/login')
      .send({
        email: 'viola1@gmail.com',
        password: 'vvvvvv',
      })
      .end((err, res) => {
        userToken = res.body.data[0].token;
        done(err);
      });
  });

  it('should return an error if user is not authenticated', done => {
    const group = {
      name: '',
      description: 'Yep, It is here, our new group',
    };
    chai
      .request(app)
      .post('/api/v2/messages')
      .set('authorization', '')
      .send(group)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('You are not logged in');
        done(err);
      });
  });

  it('should return an error if token cannot be authenticated', done => {
    const group = {
      name: '',
      description: 'Yep, It is here, our new group',
    };
    chai
      .request(app)
      .post('/api/v2/messages')
      .set('authorization', 'urgjrigriirkjwUHJFRFFJrgfr')
      .send(group)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Authentication failed');
        done(err);
      });
  });

  it('should return an error if name field is empty', done => {
    const group = {
      name: '',
      description: 'Yep, It is here, our new group',
    };
    chai
      .request(app)
      .post('/api/v2/groups')
      .set('authorization', `Bearer ${userToken}`)
      .send(group)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Group must have a name');
        done(err);
      });
  });

  it('should return an error if name field characters is less than 3 or greater than 50', done => {
    const group = {
      name: 'lorem ipsum tities lorem ipsum tities lorem ipsum tities lorem ipsum tities',
      description: 'Yep, It is here, our new group',
    };
    chai
      .request(app)
      .post('/api/v2/groups')
      .set('authorization', `Bearer ${userToken}`)
      .send(group)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql(`name contains ${group.name.length} characters, must be between 3 and 50`);
        done(err);
      });
  });

  it('should return an error if group name format is invalid', done => {
    const group = {
      name: '@hjj*..-hg',
      description: 'Yep, It is here, our new group',
    };
    chai
      .request(app)
      .post('/api/v2/groups')
      .set('authorization', `Bearer ${userToken}`)
      .send(group)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Invalid input! name can only contain alphabets, underscores and digits');
        done(err);
      });
  });

  it('should create a group if details are valid', done => {
    const group = {
      name: 'Election Matters',
      description: 'Buhari has been re-elected, PMB is on for second term',
    };
    chai
      .request(app)
      .post('/api/v2/groups')
      .set('authorization', `Bearer ${userToken}`)
      .send(group)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data[0]).to.have.property('name')
          .eql(group.name);
        done(err);
      });
  });
});
