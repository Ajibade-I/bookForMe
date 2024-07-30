const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const ParentHotel = require("./parentHotel");

const Hotel = sequelize.define("Hotel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING,
  },
  parentId: {
    type: DataTypes.INTEGER,
    references: {
      model: ParentHotel, // Refers to the ParentHotel model
      key: "id",
    },
  },
});

Hotel.belongsTo(ParentHotel, { foreignKey: "parentId", as: "parentHotel" });
ParentHotel.hasMany(Hotel, { foreignKey: "parentId", as: "branches" });

// // Sync the Admin model
// Hotel.sync({ alter: true }).then(() => {
//     console.log('Hotel table synchronized');
// }).catch((error) => {
//     console.error('Error synchronizing Hotel table:', error);
// });

module.exports = Hotel;
