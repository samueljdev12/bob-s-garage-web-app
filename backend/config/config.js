// require dotenv for all environmental variables
require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    db: {
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DD_NAME,
        options: {
            dialect: process.env.DIALECT,
            ssl: true,
            dialectOptions: {
                ssl: {
                  require: true,
                },
            // storage: './data/gragecms.sqlite'
        }
    }
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET
    }
}