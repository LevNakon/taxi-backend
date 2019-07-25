const expect = require('chai').expect;
const sinon = require('sinon');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const authController = require('../controllers/auth');

describe('auth controller - sign up', function () {

    it('should throw an error with code 500 if creation user in the database fails if you try create one user', function (done) {
        sinon.stub(User, 'create').throws();
        const req = {
            body: {
                email: 'test@test.com',
                password: 'tester',
                firstName: 'tester',
                lastName: 'tester',
                gender: 'MALE'
            }
        };
        authController.signup(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.create.restore();
        });
    });

    it('should throw an error with code 500 if hash password fails', function (done) {
        sinon.stub(bcrypt, 'hash').throws();
        const req = {
            body: {
                email: 'test@test.com',
                password: 'tester',
                firstName: 'tester',
                lastName: 'tester',
                gender: 'MALE'
            }
        };
        authController.signup(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            bcrypt.hash.restore();
        });
    });
});

describe('auth controller - sign in', function () {

    it('should throw an error with code 500 if accessing the database fails if you try find one user', function (done) {
        sinon.stub(User, 'findOne').throws();
        const req = {
            body: {
                email: 'test@test.com',
                password: 'tester'
            }
        };
        authController.signin(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });

    it('should throw an error with code 401 if user with email not found', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => undefined);
        const req = {
            body: {
                email: 'test@test.com',
                password: 'tester'
            }
        };
        authController.signin(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 401);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });

    it('should throw an error with code 500 if entered wrong password', function (done) {
        sinon.stub(User, 'findOne').returns({ id: 'testId', password: 'tester' });
        sinon.stub(bcrypt, 'compare').callsFake(() => undefined);
        const req = {
            body: {
                email: 'test@test.com',
                password: 'tester'
            }
        };
        authController.signin(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            bcrypt.compare.restore();
        });
    });

    it('should throw an error with code 500 if token creation fails', function (done) {
        sinon.stub(User, 'findOne').returns({ id: 'testId', password: 'tester' });
        sinon.stub(bcrypt, 'compare').callsFake(() => true);
        sinon.stub(jwt, 'sign').throws();
        const req = {
            body: {
                email: 'test@test.com',
                password: 'tester'
            }
        };
        authController.signin(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            bcrypt.compare.restore();
            jwt.sign.restore();
        });
    });
});