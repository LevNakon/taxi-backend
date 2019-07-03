const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
    const { statusCode = 500, success = false, message = '' } = error;
    res.status(statusCode).json({ message, success });
});

sequelize.
    //sync({ force: true })
    sync()
    .then(res => {
        app.listen(8080);
    })
    .catch(error => {
        console.log(error);
    });