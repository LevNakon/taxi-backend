exports.error505 = (error, callback) => {
    if (!error.statusCode) {
        error.statusCode = 500;
    }
    callback(error);
};