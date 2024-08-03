const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const ParentHotel = require('./parentHotel'); // Adjust the path as needed

const Admin = sequelize.define('Admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parentHotelId: {
        type: DataTypes.INTEGER,
        references: {
            model: ParentHotel,
            key: 'id'
        }
    }
});

Admin.belongsTo(ParentHotel, { foreignKey: 'parentHotelId', as: 'parentHotel' });
ParentHotel.hasOne(Admin, { foreignKey: 'parentHotelId', as: 'admin' });

module.exports = Admin;
