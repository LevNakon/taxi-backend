const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../models/user');
const Driver = require('../models/driver');
const Car = require('../models/car');
const carController = require('../controllers/car');

describe('car controller - create car', function () {

    it('should throw an error with code 500 if accessing the database fails if you try find one user', function (done) {
        sinon.stub(User, 'findOne').throws();
        const req = {
            userId: 'testId',
            body: {
                brand: 'test driver brand',
                model: 'test driver model',
                year: 'test driver year',
                run: 'test driver run'
            }
        };
        carController.createCar(req, {}, () => { }).then(result => {
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
                brand: 'test driver brand',
                model: 'test driver model',
                year: 'test driver year',
                run: 'test driver run'
            }
        };
        carController.createCar(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 401);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });

    it('should throw an error with code 500 if accessing the database fails if you try find one driver', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(Driver, 'findOne').throws();
        const req = {
            userId: 'testId',
            body: {
                brand: 'test driver brand',
                model: 'test driver model',
                year: 'test driver year',
                run: 'test driver run'
            }
        };
        carController.createCar(req, {}, () => { }).then(result => {
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
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(Driver, 'findOne').callsFake(() => undefined);
        const req = {
            userId: 'testId',
            body: {
                brand: 'test driver brand',
                model: 'test driver model',
                year: 'test driver year',
                run: 'test driver run'
            }
        };
        carController.createCar(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Driver.findOne.restore();
        });
    });

    it('should throw an error with code 500 if car creation failed', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(Driver, 'findOne').callsFake(() => true);
        const req = {
            userId: 'testId',
            body: {
                brand: 'test driver brand',
                model: 'test driver model',
                year: 'test driver year',
                run: 'test driver run'
            }
        };
        carController.createCar(req, {}, () => { }).then(result => {
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

describe('car controller - update car', function () {

    it('should throw an error with code 500 if accessing the database fails if you try find one user', function (done) {
        sinon.stub(User, 'findOne').throws();
        const req = {
            userId: 'testId',
            body: {
                brand: 'test driver brand',
                model: 'test driver model',
                year: 'test driver year',
                run: 'test driver run',
                carId: 'testCarId'
            }
        };
        carController.updateCar(req, {}, () => { }).then(result => {
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
                brand: 'test driver brand',
                model: 'test driver model',
                year: 'test driver year',
                run: 'test driver run',
                carId: 'testCarId'
            }
        };
        carController.updateCar(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 401);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });

    it('should throw an error with code 500 if accessing the database fails if you try find one driver', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(Driver, 'findOne').throws();
        const req = {
            userId: 'testId',
            body: {
                brand: 'test driver brand',
                model: 'test driver model',
                year: 'test driver year',
                run: 'test driver run',
                carId: 'testCarId'
            }
        };
        carController.updateCar(req, {}, () => { }).then(result => {
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
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(Driver, 'findOne').callsFake(() => undefined);
        const req = {
            userId: 'testId',
            body: {
                brand: 'test driver brand',
                model: 'test driver model',
                year: 'test driver year',
                run: 'test driver run',
                carId: 'testCarId'
            }
        };
        carController.updateCar(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Driver.findOne.restore();
        });
    });

    it('should throw an error with code 500 if driver want get another car', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(Driver, 'findOne').returns({ carId: "anotherTestCarId" });
        const req = {
            userId: 'testId',
            body: {
                brand: 'test driver brand',
                model: 'test driver model',
                year: 'test driver year',
                run: 'test driver run',
                carId: 'testCarId'
            }
        };
        carController.updateCar(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Driver.findOne.restore();
        });
    });

    it('should throw an error with code 500 if accessing the database fails if you try find one car', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(Driver, 'findOne').callsFake(() => true);
        sinon.stub(Car, 'findOne').throws();
        const req = {
            userId: 'testId',
            body: {
                brand: 'test driver brand',
                model: 'test driver model',
                year: 'test driver year',
                run: 'test driver run',
                carId: 'testCarId'
            }
        };
        carController.updateCar(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Driver.findOne.restore();
            Car.findOne.restore();
        });
    });

    it('should throw an error with code 500 if car with carId not found', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(Driver, 'findOne').callsFake(() => true);
        sinon.stub(Car, 'findOne').callsFake(() => undefined);
        const req = {
            userId: 'testId',
            body: {
                brand: 'test driver brand',
                model: 'test driver model',
                year: 'test driver year',
                run: 'test driver run',
                carId: 'testCarId'
            }
        };
        carController.updateCar(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Driver.findOne.restore();
            Car.findOne.restore();
        });
    });

    it('should throw an error with code 500 if car update failed', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(Driver, 'findOne').callsFake(() => true);
        sinon.stub(Car, 'findOne').callsFake(() => true);
        const req = {
            userId: 'testId',
            body: {
                brand: 'test driver brand',
                model: 'test driver model',
                year: 'test driver year',
                run: 'test driver run',
                carId: 'testCarId'
            }
        };
        carController.updateCar(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Driver.findOne.restore();
            Car.findOne.restore();
        });
    });
});

describe('car controller - get car', function () {

    it('should throw an error with code 500 if accessing the database fails if you try find one user', function (done) {
        sinon.stub(User, 'findOne').throws();
        const req = {
            userId: 'testId',
            params: {
                carId: 'testCarId'
            }
        };
        carController.getCar(req, {}, () => { }).then(result => {
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
                carId: 'testCarId'
            }
        };
        carController.getCar(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 401);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
        });
    });

    it('should throw an error with code 500 if accessing the database fails if you try find one driver', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(Driver, 'findOne').throws();
        const req = {
            userId: 'testId',
            params: {
                carId: 'testCarId'
            }
        };
        carController.getCar(req, {}, () => { }).then(result => {
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
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(Driver, 'findOne').callsFake(() => undefined);
        const req = {
            userId: 'testId',
            params: {
                carId: 'testCarId'
            }
        };
        carController.getCar(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Driver.findOne.restore();
        });
    });

    it('should throw an error with code 500 if driver want get another car', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(Driver, 'findOne').returns({ carId: "anotherTestCarId" });
        const req = {
            userId: 'testId',
            params: {
                carId: 'testCarId'
            }
        };
        carController.getCar(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Driver.findOne.restore();
        });
    });

    it('should throw an error with code 500 if accessing the database fails if you try find one car', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(Driver, 'findOne').callsFake(() => true);
        sinon.stub(Car, 'findOne').throws();
        const req = {
            userId: 'testId',
            params: {
                carId: 'testCarId'
            }
        };
        carController.getCar(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Driver.findOne.restore();
            Car.findOne.restore();
        });
    });

    it('should throw an error with code 500 if car with carId not found', function (done) {
        sinon.stub(User, 'findOne').callsFake(() => true);
        sinon.stub(Driver, 'findOne').callsFake(() => true);
        sinon.stub(Car, 'findOne').callsFake(() => undefined);
        const req = {
            userId: 'testId',
            params: {
                carId: 'testCarId'
            }
        };
        carController.getCar(req, {}, () => { }).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            expect(result).to.have.property('success', false);
            done();
        }).then(() => {
            User.findOne.restore();
            Driver.findOne.restore();
            Car.findOne.restore();
        });
    });
});