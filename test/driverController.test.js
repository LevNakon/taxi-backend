const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../models/user');
const Driver = require('../models/driver');
const driverController = require('../controllers/driver');

describe('driver controller - create driver', function () {

    it('should throw an error with code 500 if accessing the database fails if you try find one user', function (done) {
        sinon.stub(User, 'findOne').throws();
        const req = {
            userId: 'testId',
            body: {
                experience: 'test driver experience',
                condition: 'test driver condition'
            }
        };
        driverController.createDriver(req, {}, () => { }).then(result => {
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
                experience: 'test driver experience',
                condition: 'test driver condition'
            }
        };
        driverController.createDriver(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 401);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });

    it('should throw an error with code 500 if driver creation fails', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        const req = {
            userId: 'testId',
            body: {
                experience: 'test driver experience',
                condition: 'test driver condition'
            }
        };
        driverController.createDriver(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });
});

describe('driver controller - update driver', function () {

    it('should throw an error with code 500 if accessing the database fails if you try find one user', function (done) {
        sinon.stub(User, 'findOne').throws();
        const req = {
            userId: 'testId',
            body: {
                experience: 'test driver experience',
                condition: 'test driver condition',
                driverId: 'testDriverId'
            }
        };
        driverController.updateDriver(req, {}, () => { }).then(result => {
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
                experience: 'test driver experience',
                condition: 'test driver condition',
                driverId: 'testDriverId'
            }
        };
        driverController.updateDriver(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 401);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });

    it('should throw an error with code 500 if user want update another driver', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        const req = {
            userId: 'testId',
            body: {
                experience: 'test driver experience',
                condition: 'test driver condition',
                driverId: 'testDriverId'
            }
        };
        driverController.updateDriver(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });

    it('should throw an error with code 500 if accessing the database fails if you try find one driver', function (done) {
        sinon.stub(User, 'findOne').returns({ driverId: 'testDriverId' });
        sinon.stub(Driver, 'findOne').throws();
        const req = {
            userId: 'testId',
            body: {
                experience: 'test driver experience',
                condition: 'test driver condition',
                driverId: 'testDriverId'
            }
        };
        driverController.updateDriver(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Driver.findOne.restore();
        });
    });

    it('should throw an error with code 500 if driver with driverId not found', function (done) {
        sinon.stub(User, 'findOne').returns({ driverId: 'testDriverId' });
        sinon.stub(Driver, 'findOne').callsFake(() => undefined);
        const req = {
            userId: 'testId',
            body: {
                experience: 'test driver experience',
                condition: 'test driver condition',
                driverId: 'testDriverId'
            }
        };
        driverController.updateDriver(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Driver.findOne.restore();
        });
    });

    it('should throw an error with code 500 if driver could not be saved', function (done) {
        sinon.stub(User, 'findOne').returns({ driverId: 'testDriverId' });
        sinon.stub(Driver, 'findOne').callsFake(() => true);
        const req = {
            userId: 'testId',
            body: {
                experience: 'test driver experience',
                condition: 'test driver condition',
                driverId: 'testDriverId'
            }
        };
        driverController.updateDriver(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Driver.findOne.restore();
        });
    });
});

describe('driver controller - get driver', function () {

    it('should throw an error with code 500 if accessing the database fails if you try find one user', function (done) {
        sinon.stub(User, 'findOne').throws();
        const req = {
            userId: 'testId',
            params: {
                driverId: 'testDriverId'
            }
        };
        driverController.getDriver(req, {}, () => { }).then(result => {
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
            params: {
                driverId: 'testDriverId'
            }
        };
        driverController.getDriver(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 401);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });

    it('should throw an error with code 500 if user want get another driver', function (done) {
        sinon.stub(User, 'findOne').returns({ driverId: 'anotherTestDriverId' });
        const req = {
            userId: 'testId',
            params: {
                driverId: 'testDriverId'
            }
        };
        driverController.getDriver(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });

    it('should throw an error with code 500 if accessing the database fails if you try find one driver', function (done) {
        sinon.stub(User, 'findOne').returns({ driverId: 'testDriverId' });
        sinon.stub(Driver, 'findOne').throws();
        const req = {
            userId: 'testId',
            params: {
                driverId: 'testDriverId'
            }
        };
        driverController.getDriver(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Driver.findOne.restore();
        });
    });

    it('should throw an error with code 500 if driver with driverId not found', function (done) {
        sinon.stub(User, 'findOne').returns({ driverId: 'testDriverId' });
        sinon.stub(Driver, 'findOne').callsFake(() => undefined);
        const req = {
            userId: 'testId',
            params: {
                driverId: 'testDriverId'
            }
        };
        driverController.getDriver(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Driver.findOne.restore();
        });
    });
});