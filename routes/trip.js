const express = require('express');
const { body } = require('express-validator/check');

const isAuth = require('../middleware/is-auth');
const tripController = require('../controllers/trip');

const router = express.Router();

/**
 * POST /trip/create
 */
router.post('/create', isAuth, [
    body('startAddress')
        .trim()
        .not()
        .isEmpty(),
    body('endAddress')
        .trim()
        .not()
        .isEmpty(),
    body('price')
        .trim()
        .not()
        .isEmpty()
], tripController.createTrip);

/**
 * GET /trip/all
 */
router.get('/all', isAuth, tripController.getTrips);

module.exports = router;