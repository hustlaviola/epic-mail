import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

chai.use(chaiHttp);

const { expect } = chai;

describe('/POST Signup route', () => {
  it('should return an error if email field is empty', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: '',
        firstname: 'Viola',
        lastname: 'Violin',
        password: 'viola10',
        confirmpassword: 'viola10',
        phonenumber: '07022334455',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('email field cannot be empty');
        done(err);
      });
  });

  it('should return an error if email field is badly formatted', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'viola10gmail.com',
        firstname: 'Viola',
        lastname: 'Violin',
        password: 'viola10',
        confirmpassword: 'viola10',
        phonenumber: '07022334455',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Invalid email format');
        done(err);
      });
  });

  it('should return an error if first name field is empty', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'viola10@epicmail.com',
        firstname: '',
        lastname: 'Violin',
        password: 'viola10',
        confirmpassword: 'viola10',
        phonenumber: '07022334455',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('firstname field cannot be empty');
        done(err);
      });
  });

  it('should return an error if first name field is badly formatted', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'viola10@epicmail.com',
        firstname: 'Viola33',
        lastname: 'Violin',
        password: 'viola10',
        confirmpassword: 'viola10',
        phonenumber: '07022334455',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('first name must be alphabets only between 3 and 30');
        done(err);
      });
  });

  it('should return an error if last name field is empty', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'viola10@epicmail.com',
        firstname: 'Viola',
        lastname: '',
        password: 'viola10',
        confirmpassword: 'viola10',
        phonenumber: '07022334455',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('lastname field cannot be empty');
        done(err);
      });
  });

  it('should return an error if last name field is badly formatted', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'viola10@epicmail.com',
        firstname: 'Viola',
        lastname: 'Violin33',
        password: 'viola10',
        confirmpassword: 'viola10',
        phonenumber: '07022334455',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('last name must be alphabets only between 3 and 30');
        done(err);
      });
  });

  it('should return an error if password field is empty', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'viola10@epicmail.com',
        firstname: 'Viola',
        lastname: 'Violin',
        password: '',
        confirmpassword: 'viola10',
        phonenumber: '07022334455',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('password field cannot be empty');
        done(err);
      });
  });

  it('should return an error if password is less than 6 characters', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'viola10@epicmail.com',
        firstname: 'Viola',
        lastname: 'Violin',
        password: 'vio56',
        confirmpassword: 'viola10',
        phonenumber: '07022334455',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('password must be at least 6 characters');
        done(err);
      });
  });

  it('should return an error if confirmpassword field is empty', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'viola10@epicmail.com',
        firstname: 'Viola',
        lastname: 'Violin',
        password: 'viola10',
        confirmpassword: '',
        phonenumber: '07022334455',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('confirm your password');
        done(err);
      });
  });

  it('should return an error if password does not match', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'viola10@epicmail.com',
        firstname: 'Viola',
        lastname: 'Violin',
        password: 'viola10',
        confirmpassword: 'violds',
        phonenumber: '07022334455',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('password does not match');
        done(err);
      });
  });

  it('should return an error if phone number field is empty', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'viola10@epicmail.com',
        firstname: 'Viola',
        lastname: 'Violin',
        password: 'viola10',
        confirmpassword: 'viola10',
        phonenumber: '',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('phonenumber field cannot be empty');
        done(err);
      });
  });

  it('should return an error if phone number field is badly formatted', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'viola10@epicmail.com',
        firstname: 'Viola',
        lastname: 'Violin',
        password: 'viola10',
        confirmpassword: 'viola10',
        phonenumber: '07022rt4455',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Invalid phone number format');
        done(err);
      });
  });

  it('should create a new user if details are valid', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'viola10@epicmail.com',
        firstname: 'Viola',
        lastname: 'Violin',
        password: 'viola10',
        confirmpassword: 'viola10',
        phonenumber: '07022334455',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.property('token');
        done(err);
      });
  });

  it('should return an error if there is an existing email', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'viola2@epicmail.com',
        firstname: 'Viola',
        lastname: 'Violin',
        password: 'viola10',
        confirmpassword: 'viola10',
        phonenumber: '07922334455',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('email already exists');
        done(err);
      });
  });

  it('should return an error if there is an existing phone number', done => {
    chai
      .request(app)
      .post('/api/v2/auth/signup')
      .send({
        email: 'viola7@epicmail.com',
        firstname: 'Viola',
        lastname: 'Violin',
        password: 'viola10',
        confirmpassword: 'viola10',
        phonenumber: '07022334455',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('phone number already exists');
        done(err);
      });
  });
});

describe('/POST Login route', () => {
  it('should return an error if email field is empty', done => {
    const loginDetails = {
      email: '',
      password: 'viola10',
    };
    chai
      .request(app)
      .post('/api/v2/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('email field cannot be empty');
        done(err);
      });
  });

  it('should return an error if email is badly formatted', done => {
    const loginDetails = {
      email: 'viola10@gmail.com',
      password: 'viola10',
    };
    chai
      .request(app)
      .post('/api/v2/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Invalid email format');
        done(err);
      });
  });

  it('should return an error if password field is empty', done => {
    const loginDetails = {
      email: 'viola1@epicmail.com',
      password: '',
    };
    chai
      .request(app)
      .post('/api/v2/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('password field cannot be empty');
        done(err);
      });
  });

  it('should return an error if password field is less than 6 characters', done => {
    const loginDetails = {
      email: 'viola2@epicmail.com',
      password: 'viola',
    };
    chai
      .request(app)
      .post('/api/v2/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('password must be at least 6 characters');
        done(err);
      });
  });

  it('should return an error if email does not exist', done => {
    const loginDetails = {
      email: 'viola29@epicmail.com',
      password: 'viola54',
    };
    chai
      .request(app)
      .post('/api/v2/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('User does not exist');
        done(err);
      });
  });

  it('should return an error if email does not match password', done => {
    const loginDetails = {
      email: 'viola1@epicmail.com',
      password: 'viola12',
    };
    chai
      .request(app)
      .post('/api/v2/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Password is incorrect');
        done(err);
      });
  });

  it('should log user in if details are valid', done => {
    const loginDetails = {
      email: 'viola1@epicmail.com',
      password: 'vvvvvv',
    };
    chai
      .request(app)
      .post('/api/v2/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('array');
        expect(res.body.data[0]).to.have.property('token');
        done(err);
      });
  });
});
