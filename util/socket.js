const socketpool = require('pool.socket.io');

exports.taxiSocket = function (server) {
    const availableTrips = [];
    const connectionManager = socketpool.default(server);
    connectionManager.onConnection((connection, pool) => {

        connection.on('trip', ({ name, id, startAddress, endAddress }) => {
            availableTrips.push({ name, id, startAddress, endAddress, socketId: connection.socket.id });
            pool.to('driver room').emit('response get available trips', availableTrips);
            connection.emit('trip status', { confirmed: true });
        });

        connection.on('request get available trips', () => {
            pool.to('driver room').emit('response get available trips', availableTrips);
        });

        connection.on('cancel trip', ({ id }) => {
            if (availableTrips.map(elem => elem.id).indexOf(id) !== -1) {
                availableTrips.splice(availableTrips.map(elem => elem.id).indexOf(id), 1);
                pool.to('driver room').emit('response get available trips', availableTrips);
                connection.emit('trip status', { confirmed: false });
            }
        });

        connection.on('driver confirm trip', ({ id, driverId }) => {
            if (availableTrips.map(elem => elem.socketId).indexOf(id) !== -1) {
                const trip = availableTrips.splice(availableTrips.map(elem => elem.socketId).indexOf(id), 1);
                pool.to('driver room').emit('response get available trips', availableTrips);
                connection.emit('driver trip status', { confirmedDriver: true, userId: id, trip: trip[0] });
                connectionManager.emitTo(id, 'user driver', { confirmedTrip: true, driverId });
            }
        });

        connection.on('cancel confirmed trip', ({ driverId }) => {
            connectionManager.emitTo(driverId, 'driver trip status', { confirmedDriver: false, userId: null, trip: null });
            connection.emit('trip status', { confirmed: false });
            connection.emit('user driver', { confirmedTrip: false, driverId: null });
        });

        connection.on('finish confirmed trip', ({ userId }) => {
            connection.emit('driver trip status', { confirmedDriver: false, userId: null, trip: null });
            connectionManager.emitTo(userId, 'trip status', { confirmed: false });
            connectionManager.emitTo(userId, 'user driver', { confirmedTrip: false, driverId: null });
        });

        connection.on('join driver', () => {
            connection.socket.join('driver room');
        });

        connection.on('leave driver', () => {
            connection.socket.leave('driver room');
        });

        connection.on('disconnect', () => {
        });
    });
};