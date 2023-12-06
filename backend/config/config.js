// require dotenv for all environmental variables
require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    db: {
        host: process.env.HOST,
        port: '5432',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DD_NAME,
        options: {
            dialect: process.env.DIALECT,
           
       
    }
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET
    }
}