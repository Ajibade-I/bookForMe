const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "defaultdb", // The default database name for CockroachDB
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    dialect: "postgres", // Use PostgreSQL dialect for CockroachDB
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // If you need to reject unauthorized certificates
      },
    },
    // Optional: Uncomment and configure if needed
    // pool: {
    //   max: 100,
    //   min: 0,
    //   acquire: 1000000,
    //   idle: 100000,
    //   evict: 2000,
    // },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to CockroachDB with Sequelize");
  } catch (error) {
    console.error("Error connecting to CockroachDB with Sequelize:", error);
  }
};

module.exports = { sequelize, connectDB };
