// this file holds all models for the databse

// require sequelize for modelling and doing operations on data
const {Sequelize, Datatypes, DataTypes} = require('sequelize');

// bring the configuration file
const config = require("../config/config");

// creating db varaible
let db = {};

// creating a sequelize object and pass in db details
const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

// set up models
//user model
const User = sequelize.define("User", {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
         allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
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

    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

// services model
const Service = sequelize.define("Service", {
    serviceId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

// blog model
const Blog = sequelize.define("Blog", {
    postId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    
})

// feedback model
const Feedback = sequelize.define("Feedback", {
    feedId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    
})

// establish relationship between user and feedback
User.hasOne(Feedback)
Feedback.belongsTo(User)

// Set up our access vars
// This will allows us to access the sequelize object if we use this module
db.sequelize = sequelize;
// This will allow us to access the Sequelize class if we use this module
db.Sequelize = Sequelize;
// log db
// console.log(db);

// Set up the exports.
module.exports = db;
module.exports.Op = Sequelize.Op;
// The op allows us to use database operators.