// require dotenv for all environmental variables
require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    db: {
        host: process.env.HOST,
        options: {
            dialect: process.env.DIALECT,
            dialectOptions: {
                ssl: {
                  rejectUnauthorized: false, // You might need to set this to true in a production environment with a valid CA certificate
                },
              },
    }
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET
    }
}