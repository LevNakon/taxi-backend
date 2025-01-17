const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        error.success = false;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'lev_nakonechnyy_token_key')
    } catch (error) {
        error.statusCode = 500;
        error.success = false;
        throw error;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        error.success = false;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};