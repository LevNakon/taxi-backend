const express = require('express');
const bodyParser = require('body-parser');
const socketpool = require('pool.socket.io');

const sequelize = require('./util/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const driverRoutes = require('./routes/driver');
const carRoutes = require('./routes/car');

const User = require('./models/user');
const Driver = require('./models/driver');
const Car = require('./models/car');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization,X-Requested-With');
    next();
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/driver', driverRoutes);
app.use('/car', carRoutes);

app.use((error, req, res, next) => {
    const { statusCode = 500, success = false, message = '' } = error;
    res.status(statusCode).json({ message, success });
});

User.belongsTo(Driver, { constraints: true, onUpdate: 'CASCADE' });
Driver.hasOne(User);

Driver.belongsTo(Car, { constraints: true, onDelete: 'CASCADE' });
Car.hasOne(Driver);

sequelize.
    // sync({ force: true })
    sync()
    .then(res => {
        const server = app.listen(8080);
        const connectionManager = socketpool.default(server);
        connectionManager.onConnection((connection, pool) => {
            connection.on('message', (message) => {
                // console.log('message', message, pool.eio);
                // console.log(pool.clients());
                console.log(connection.id);
            })

            connection.on('disconnect', () => {
            });
        });
    })
    .catch(error => {
        console.log(error);
    });