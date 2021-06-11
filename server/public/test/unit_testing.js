const mocha=require('mocha');
const chai=require('chai');
const chaiHttp=require('chai-http');
const should=chai.should();

const data = require('./testconfig');

var token;
chai.use(chaiHttp);

const url = 'http://35.225.238.45:5000'

describe('Backend hosted', () => {
    it('initial get request', (done) => {
        chai.request(url).get('/').end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.equal('welcome')
            done();
        })
    })
})

describe('sign up authentication', ()=> {

    it('Register as Faculty', (done) => {
        chai.request(url).post('/user/signup').send({data:data.registerF}).end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.equal("Duplicate entry 'F18121' for key 'users.PRIMARY'")
            done();
        })
    });
    it('Register as Student', (done) => {
        chai.request(url).post('/user/signup').send({data:data.registerS}).end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.equal("Duplicate entry '18121' for key 'users.PRIMARY'")
            done();
        })
    });
});

describe('Student workflow', () => {
    it('Login as student with correct credentials', (done) => {
        chai.request(url).post('/user/signin').send({data:data.loginS}).end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.be.equal('User Verified')
            token = res.body.token;
            done();
        })
    });
    it('Login as student with false credentials', (done) => {
        chai.request(url).post('/user/signin').send({data:data.loginS1}).end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.equal("Incorrect password")
            done();
        })
    });
    it('who am i', (done) => {
        chai.request(url).get('/api/who').set('Authorization','Bearer '+token).end((err, res) => {
            res.should.have.status(200);
            res.body.roll_no.should.be.equal(data.loginS.roll_no)
            done();
        })
    });
    it('checking the role', (done) => {
        chai.request(url).get('/api/who').set('Authorization','Bearer '+token).end((err, res) => {
            res.should.have.status(200);
            res.body.role.should.be.equal("Student")
            done();
        })
    });
    it('fetching all the courses for student', (done) => {
        chai.request(url).post('/api/courses').set('Authorization','Bearer '+token).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            done();
        })
    });
    it('student trying to insert a subject', (done) => {
        chai.request(url).post('/api/insert_course').send({data:data.createSubject}).set('Authorization','Bearer '+token).end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.equal("UnAuthorized");
            done();
        })
    });
    it('student trying to create contest', (done) => {
        chai.request(url).post('/api/create_contest').send(data.createContest).set('Authorization','Bearer '+token).end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.equal("UnAuthorized");
            done();
        })
    });
    it('rendering contests', (done) => {
        chai.request(url).post('/api/contests').send({code:"None"}).set('Authorization','Bearer '+token).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            done();
        })
    });
});

describe('Faculty workflow', () => {
    it('Login as Faculty with correct credentials', (done) => {
        chai.request(url).post('/user/signin').send({data:data.loginF}).end((err, res) => {
            res.should.have.status(200);
            res.body.message.should.be.equal('User Verified')
            token = res.body.token;
            done();
        })
    });
    it('Login as Faculty with false credentials', (done) => {
        chai.request(url).post('/user/signin').send({data:data.loginF1}).end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.equal("Incorrect password")
            done();
        })
    });
    it('who am i', (done) => {
        chai.request(url).get('/api/who').set('Authorization','Bearer '+token).end((err, res) => {
            res.should.have.status(200);
            res.body.roll_no.should.be.equal(data.loginF.roll_no)
            done();
        });
    });
    it('cheking after login credentials', (done) => {
        chai.request(url).get('/api/who').set('Authorization','Bearer '+token).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('object');
            done();
        });
    });
    it('checking the role', (done) => {
        chai.request(url).get('/api/who').set('Authorization','Bearer '+token).end((err, res) => {
            res.should.have.status(200);
            res.body.role.should.be.equal("Admin")
            done();
        })
    });
    it('fetching subjects handled by teacher', (done) => {
        chai.request(url).post('/api/courses').set('Authorization','Bearer '+token).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            done();
        })
    });
    it('insert a subject', (done) => {
        chai.request(url).post('/api/insert_course').send({data:data.createSubject}).set('Authorization','Bearer '+token).end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.equal("Duplicate entry '15MAT310' for key 'course.PRIMARY'");
            done();
        })
    });
    it('creating contests', (done) => {
        chai.request(url).post('/api/create_contest').send(data.createContest).set('Authorization','Bearer '+token).end((err, res) => {
            res.should.have.status(200);
            res.body.affectedRows.should.be.equal(1);
            done();
        })
    });
    it('rendering contests', (done) => {
        chai.request(url).post('/api/contests').send({code:"13cse121"}).set('Authorization','Bearer '+token).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array');
            done();
        })
    });
    
});
