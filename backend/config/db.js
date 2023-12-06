// db.js
const { Client } = require('pg');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DD_NAME,
  password: process.env.DB_PASS,
  port: 5432,
  ssl: {
    rejectUnauthorized: false, // You might need to set this to true in a production environment with a valid CA certificate
    ca: fs.readFileSync('./ssl.js'), // Specify the path to your CA certificate
  },
});

module.exports = client;
