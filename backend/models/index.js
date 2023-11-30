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
        allowNull: false,
        validate: {
            notNull: {
                msg: 'First name cannot be empty.'
            },
            notEmpty: {
                msg: 'First name cannot be empty.'
            }
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Last name cannot be empty.'
            },
            notEmpty: {
                msg: 'Last name cannot be empty.'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: 'Email cannot be empty.'
            },
            notEmpty: {
                msg: 'Email cannot be empty.'
            },
            isEmail: {
                msg: 'Invalid email format.'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Password cannot be empty.'
            },
            notEmpty: {
                msg: 'Password cannot be empty.'
            },
            isStrongPassword: {
                msg: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.',
                options: {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                }
            }
        }
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

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
        unique: true,
        validate: {
            notNull: {
                msg: 'Service name cannot be empty.'
            },
            notEmpty: {
                msg: 'Service name cannot be empty.'
            }
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Description cannot be empty.'
            },
            notEmpty: {
                msg: 'Description cannot be empty.'
            }
        }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Price cannot be empty.'
            },
            notEmpty: {
                msg: 'Price cannot be empty.'
            },
            isFloat: {
                msg: 'Price must be a valid floating-point number.'
            }
        }
    }
});

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
        validate: {
            notNull: {
                msg: 'Title cannot be empty.'
            },
            notEmpty: {
                msg: 'Title cannot be empty.'
            }
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Content cannot be empty.'
            },
            notEmpty: {
                msg: 'Content cannot be empty.'
            }
        }
    },
    image: {
        type: DataTypes.STRING
        // You can add validation for image if needed
    }
});


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
        validate: {
            notNull: {
                msg: 'Content cannot be empty.'
            },
            notEmpty: {
                msg: 'Content cannot be empty.'
            }
        }
    }
});

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