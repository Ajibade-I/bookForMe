// src/models/Room.js
const { DataTypes } = require('sequelize');
const Hotel = require('./hotel');
const { sequelize } = require('../config/db');

const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    hotelId: {
        type: DataTypes.INTEGER,
        references: {
            model: Hotel,
            key: 'id'
        },
        allowNull: false
    },
    roomNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roomType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'available'
    }
});

Hotel.hasMany(Room, { foreignKey: 'hotelId' });
Room.belongsTo(Hotel, { foreignKey: 'hotelId' });

module.exports = Room;
