const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../models/user');
const Trip = require('../models/trip');
const tripController = require('../controllers/trip');

describe('trip controller - create trip', function () {

    it('should throw an error with code 500 if accessing the database fails if you try find one user', function (done) {
        sinon.stub(User, 'findOne').throws();
        const req = {
            body: {
                startAddress: 'test start address',
                endAddress: 'test end address',
                price: 'test price',
                id: 'testId'
            }
        };
        tripController.createTrip(req, {}, () => { }).then(result => {
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
            body: {
                startAddress: 'test start address',
                endAddress: 'test end address',
                price: 'test price',
                id: 'testId'
            }
        };
        tripController.createTrip(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 401);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });

    it('should throw an error with code 500 if trip creation fails', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        const req = {
            body: {
                startAddress: 'test start address',
                endAddress: 'test end address',
                price: 'test price',
                id: 'testId'
            }
        };
        tripController.createTrip(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });
});

describe('trip controller - get all trips', function () {

    it('should throw an error with code 500 if accessing the database fails if you try find one user', function (done) {
        sinon.stub(User, 'findOne').throws();
        const req = {
            userId: 'testId'
        };
        tripController.getTrips(req, {}, () => { }).then(result => {
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
        tripController.getTrips(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 401);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });

    it('should throw an error with code 500 if accessing the database fails if you try find all user trips', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(Trip, 'findAll').throws();
        const req = {
            userId: 'testId'
        };
        tripController.getTrips(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Trip.findAll.restore();
        });
    });
});