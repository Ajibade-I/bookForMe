
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Hotel = require('./hotel');

const Service = sequelize.define('Service', {
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
        }
    },
    ServiceName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.TEXT
    },
    Price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

Hotel.hasMany(Service, { foreignKey: 'hotelId' });
Service.belongsTo(Hotel, { foreignKey: 'hotelId' });

module.exports = Service;
