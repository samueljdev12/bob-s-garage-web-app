// Bring in Bcrypt
const bcrypt = require("bcrypt");

// bring in jwt
const jwt = require("jsonwebtoken");

// bring in the Sequelzie model
db = require("../models");

// bringing config file in server.js
const config = require("../config/config");

// Destructure models
const { User } = db.sequelize.models;

// register user
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // check if user exists
    const user = await User.findOne({ where: { email: email } });
    // send message back if user exists
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    // create a new user object
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      isAdmin: false,
    };

    // has password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // save user to databse
    const userRes = await User.create({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
      isAdmin: newUser.isAdmin,
    });

    // create a payload
    const payload = {
        user: {
            userId: userRes.userId,
            firstName: userRes.firstName,
            lastName: userRes.lastName,
            email: userRes.email,
            isAdmin: userRes.isAdmin,
          },
    };

    // sogn the JWT token
    jwt.sign(
      payload,
      config.auth.jwtSecret,
      {
        expiresIn: "5d",
        algorithm: "HS512",
      },
      (err, token) => {
        if (err) throw err;
        res.json({token});
      }
    );
  } catch (error) {
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

// login user
const login = async (req, res) => {
  try {
    // geting information from post body
    const { email, password } = req.body;
    // find user in databse
    let user = await User.findOne({ where: { email: email } });

    // check if user exists and send message when crenddentials are incorretc
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // Send a message back if the password is incorrect.
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // create a payload
    const payload = {
      user: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      }
    };

    // sign payload with jwt
    jwt.sign(
      payload,
      config.auth.jwtSecret,
      {
        expiresIn: "5d",
        algorithm: "HS512",
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    // Send back an error message.
    res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

// get user details
//private must be logged in
const getUser = async(req, res) => {
  const options = { attributes: {exclude: ['password']}};
  try {
    const user = await User.findByPk(req.user.userId, options);
    res.json(user);
  } catch (error) {
    return res.status(500).json("Server Error");
  }
}

module.exports = {
  signup,
  login,
  getUser
};
