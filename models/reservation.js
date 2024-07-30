const { DataTypes } = require('sequelize');
const Guest = require('./guest');
const Room = require('./room');
const { sequelize } = require('../config/db');

const Reservation = sequelize.define('Reservation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    guestId: {
        type: DataTypes.INTEGER,
        references: {
            model: Guest,
            key: 'id'
        },
        allowNull: false
    },
    roomId: {
        type: DataTypes.INTEGER,
        references: {
            model: Room,
            key: 'id'
        },
        allowNull: false
    },
    checkInDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    },
    duration:{
        type: DataTypes.STRING,   
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

Guest.hasMany(Reservation, { foreignKey: 'guestId' });
Reservation.belongsTo(Guest, { foreignKey: 'guestId' });
Room.hasMany(Reservation, { foreignKey: 'roomId' });
Reservation.belongsTo(Room, { foreignKey: 'roomId' });

module.exports = Reservation;
