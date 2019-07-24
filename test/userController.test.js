const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../models/user');
const userController = require('../controllers/user');

describe('user controller - get user', function () {

    it('should throw an error with code 500 if accessing the database fails if you try find one user', function (done) {
        sinon.stub(User, 'findOne').throws();
        const req = {
            userId: 'testId'
        };
        userController.userGet(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });

    it('should throw an error with code 401 if user with userId not found', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => undefined);
        const req = {
            userId: 'testId'
        };
        userController.userGet(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 401);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });
});

describe('user controller - update user', function () {

    it('should throw an error with code 500 if accessing the database fails if you try find one user', function (done) {
        sinon.stub(User, 'findOne').throws();
        const req = {
            userId: 'testId',
            body: {
                email: 'test@test.com',
                firstName: 'tester',
                lastName: 'tester',
                birthdayDate: 'some test date',
                mobileNumber: 'some test mobile number',
                homeAddress: 'some test home address',
                workAddress: 'some test work address'
            }
        };
        userController.userUpdate(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });

    it('should throw an error with code 401 if user with userId not found', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => undefined);
        const req = {
            userId: 'testId',
            body: {
                email: 'test@test.com',
                firstName: 'tester',
                lastName: 'tester',
                birthdayDate: 'some test date',
                mobileNumber: 'some test mobile number',
                homeAddress: 'some test home address',
                workAddress: 'some test work address'
            }
        };
        userController.userUpdate(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 401);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });

    it('should throw an error with code 500 if user save fails', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        const req = {
            userId: 'testId',
            body: {
                email: 'test@test.com',
                firstName: 'tester',
                lastName: 'tester',
                birthdayDate: 'some test date',
                mobileNumber: 'some test mobile number',
                homeAddress: 'some test home address',
                workAddress: 'some test work address'
            }
        };
        userController.userUpdate(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });
});