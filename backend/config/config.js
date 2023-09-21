// require dotenv for all environmental variables
require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    db: {
        database: process.env.DD_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        options: {
            dialect: process.env.DIALECT,
            host: process.env.localhost,
            storage: './data/gragecms.sqlite'
        }
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET
    }
}