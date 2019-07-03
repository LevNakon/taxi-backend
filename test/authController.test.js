const expect = require('chai').expect;
const sinon = require('sinon');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const authController = require('../controllers/auth');

describe('auth controller - login', function () {

    it('should throw an error with code 500 if accessing the database fails', function (done) {
        sinon.stub(User, 'findOne');
        User.findOne.throws();
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
        });
        User.findOne.restore();
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
        });
        User.findOne.restore();
    });

    it('should throw an error with code 401 if entered wrong password', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(bcrypt, 'compare').callsFake(() => false);
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
        });
        User.findOne.restore();
        bcrypt.compare.restore();
    });
});  