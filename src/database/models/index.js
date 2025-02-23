require('dotenv').config();
const { Sequelize } = require('sequelize');

// Ensure environment variables are loaded
if (!process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_NAME || !process.env.DB_PASSWORD || !process.env.DB_PORT) {
  throw new Error("❌ Missing required database environment variables. Check your .env file.");
}

// Initialize Sequelize with PostgreSQL configuration
const sequelize = new Sequelize(
  process.env.DB_NAME,        // Database name
  process.env.DB_USER,        // Database user
  process.env.DB_PASSWORD,    // Database password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',      // Explicitly set to PostgreSQL
    logging: false,           // Set to 'console.log' for debugging SQL queries
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize, Sequelize);

// Test database connection
sequelize.authenticate()
  .then(() => console.log("✅ PostgreSQL database connected successfully."))
  .catch(err => console.error("❌ Database connection failed:", err));

module.exports = db;
