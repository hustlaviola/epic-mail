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
      .post('/api/v2/groups')
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
      .post('/api/v2/groups')
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

describe('/GET Group route', () => {
  it('should return an error if user is not authenticated', done => {
    chai
      .request(app)
      .get('/api/v2/groups')
      .set('authorization', '')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('You are not logged in');
        done(err);
      });
  });

  it('should return an error if token cannot be authenticated', done => {
    chai
      .request(app)
      .get('/api/v2/groups')
      .set('authorization', 'urgjrigriirkjwUHJFRFFJrgfr')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Authentication failed');
        done(err);
      });
  });

  it('should retrieve all groups the authenticated user belongs to', done => {
    chai
      .request(app)
      .get('/api/v2/groups')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data[0]).to.have.property('name');
        expect(res.body.data[0]).to.have.property('role');
        done(err);
      });
  });
});

describe('/PATCH Group route', () => {
  it('should return an error if user is not authenticated', done => {
    const group = {
      id: 1,
      name: 'Champions',
    };
    chai
      .request(app)
      .patch(`/api/v2/groups/${group.id}/name`)
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
      id: 1,
      name: 'Champions',
    };
    chai
      .request(app)
      .patch(`/api/v2/groups/${group.id}/name`)
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
      id: 1,
      name: '',
    };
    chai
      .request(app)
      .patch(`/api/v2/groups/${group.id}/name`)
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
      id: 1,
      name: 'lorem ipsum tities lorem ipsum tities lorem ipsum tities lorem ipsum tities',
    };
    chai
      .request(app)
      .patch(`/api/v2/groups/${group.id}/name`)
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
      id: 1,
      name: '@hjj*..-hg',
    };
    chai
      .request(app)
      .patch(`/api/v2/groups/${group.id}/name`)
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

  it('should return an error if id format is invalid', done => {
    const group = {
      id: 'ty',
      name: 'Champions',
    };
    chai
      .request(app)
      .patch(`/api/v2/groups/${group.id}/name`)
      .set('authorization', `Bearer ${userToken}`)
      .send(group)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('The given id is invalid');
        done(err);
      });
  });

  it('should return an error if group does not exist', done => {
    const group = {
      id: 4567,
      name: 'Champions',
    };
    chai
      .request(app)
      .patch(`/api/v2/groups/${group.id}/name`)
      .set('authorization', `Bearer ${userToken}`)
      .send(group)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Group does not exist');
        done(err);
      });
  });

  it('should return an error if user does not belong to the group', done => {
    const group = {
      id: 3,
      name: 'Champions',
    };
    chai
      .request(app)
      .patch(`/api/v2/groups/${group.id}/name`)
      .set('authorization', `Bearer ${userToken}`)
      .send(group)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('You do not belong to this group');
        done(err);
      });
  });

  it('should return an error if user is not an admin', done => {
    const group = {
      id: 2,
      name: 'Champions',
    };
    chai
      .request(app)
      .patch(`/api/v2/groups/${group.id}/name`)
      .set('authorization', `Bearer ${userToken}`)
      .send(group)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Require Admin access');
        done(err);
      });
  });

  it('should rename the group if credentials are valid', done => {
    const group = {
      id: 1,
      name: 'Champions',
    };
    chai
      .request(app)
      .patch(`/api/v2/groups/${group.id}/name`)
      .set('authorization', `Bearer ${userToken}`)
      .send(group)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.property('name')
          .eql(`${group.name}`);
        expect(res.body.data[0]).to.have.property('role')
          .eql('admin');
        done(err);
      });
  });
});

describe('/DELETE Group route', () => {
  it('should return an error if user is not authenticated', done => {
    const group = {
      id: 1,
    };
    chai
      .request(app)
      .delete(`/api/v2/groups/${group.id}`)
      .set('authorization', '')
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
      id: 1,
    };
    chai
      .request(app)
      .delete(`/api/v2/groups/${group.id}`)
      .set('authorization', 'urgjrigriirkjwUHJFRFFJrgfr')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Authentication failed');
        done(err);
      });
  });

  it('should return an error if id format is invalid', done => {
    const group = {
      id: 'ty',
    };
    chai
      .request(app)
      .delete(`/api/v2/groups/${group.id}`)
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('The given id is invalid');
        done(err);
      });
  });

  it('should return an error if group does not exist', done => {
    const group = {
      id: 4567,
    };
    chai
      .request(app)
      .delete(`/api/v2/groups/${group.id}`)
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Group does not exist');
        done(err);
      });
  });

  it('should return an error if user does not belong to the group', done => {
    const group = {
      id: 3,
    };
    chai
      .request(app)
      .delete(`/api/v2/groups/${group.id}`)
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('You do not belong to this group');
        done(err);
      });
  });

  it('should return an error if user is not an admin', done => {
    const group = {
      id: 2,
    };
    chai
      .request(app)
      .delete(`/api/v2/groups/${group.id}`)
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Require Admin access');
        done(err);
      });
  });

  it('should delete the group if all relevant details are valid', done => {
    const group = {
      id: 1,
    };
    chai
      .request(app)
      .delete(`/api/v2/groups/${group.id}`)
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data[0]).to.have.property('message')
          .eql('Group deleted successfully');
        done(err);
      });
  });
});
