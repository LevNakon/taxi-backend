const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const db = require('./models');

const swaggerDocument = YAML.load('./swagger.yml');
const sequelize = require('./util/database');
const { taxiSocket } = require('./util/socket');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const driverRoutes = require('./routes/driver');
const carRoutes = require('./routes/car');
const tripRoutes = require('./routes/trip');

const User = require('./models/user');
const Driver = require('./models/driver');
const Car = require('./models/car');
const Trip = require('./models/trip');

const port = process.env.PORT || 8080;

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
app.use('/trip', tripRoutes);

app.use((error, req, res, next) => {
    const { statusCode = 500, success = false, message = '' } = error;
    res.status(statusCode).json({ message, success });
});

User.belongsTo(Driver, { constraints: true, onUpdate: 'CASCADE' });
Driver.hasOne(User);

Driver.belongsTo(Car, { constraints: true, onDelete: 'CASCADE' });
Car.hasOne(Driver);

Trip.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Trip);

db.sequelize.sync().then(function () {
    const server = app.listen(port);
    taxiSocket(server);
});
// sequelize.
//     // sync({ force: true })
//     sync()
//     .then(res => {
//         const server = app.listen(port);
//         taxiSocket(server);
//     })
//     .catch(error => {
//         console.log(error);
//     });