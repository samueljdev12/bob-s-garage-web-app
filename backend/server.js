// this is the entry main point file for the backend
// it contains app routes
const express = require('express');
const cors = require('cors');
// initialize app
const app = express();

const auth = require("./middleware/authenticate");
// enbalbe json support
app.use(express.json());
// enable url encoded
app.use(express.urlencoded({ extended: true}))

// bring in the Sequelzie model
db = require("./models")


// enbale cors
app.use(cors())

// bringing config file in server.js
const config = require("./config/config")



// bring user controller
const userController = require("./controllers/userController");

// bringing blog controller
const blogController = require("./controllers/blogContoller");

// bring feedback controller
const feedbackController = require("./controllers/feedbackController");

//service ocntroller
const servicesController = require("./controllers/SerVicesController")

// feedback routes
//private route user must be authenticated
// add a new feedback route
app.post("/server/feedbacks/new", auth, feedbackController.addFeedback);

// get alll feedbacks
//public route no auth required
app.get("/server/feedbacks", feedbackController.getAllFeedback)

// edit feedback endpoint
//private route user must be authenticated
app.put("/server/feedbacks/delete/:id", feedbackController.deleteFeedback)

// get one feedback
//public route no auth required
app.get("/server/feedback/:id", feedbackController.getFeedback)

// update feed
app.put("/server/feedbacks/edit/:id", feedbackController.editFeedback);

// delete feedback
//privat toute auth required and only admin users can delete
app.post("/server/feedback/:feedId", feedbackController.deleteFeedback)


// bog endpoints
// get all blog post
// public route no auth required
app.get("/server/blog/all", blogController.getAllBlog)

// add new post
// private route auth and only admin users can add
app.post("/server/blog/add", blogController.addNew)

// update post route
//priate route auth and only admin users can update
app.post("/server/blog/edit/:id", blogController.editPost)

// delete post route
//private route auth and only admin users can delete
app.post("/server/blog/delete/:id", blogController.deletePost)

// users routes
// signup route
// public route no auth required
app.post("/server/signup", userController.signup)

//login route
//public route no auth required
app.post("/server/login", userController.login)

// get user details
app.get("/server/user", auth, userController.getUser)


// services
app.get("/server/services", servicesController.getServices);
app.post("/server/services/new", servicesController.addService)

// server 
db.sequelize.sync().then(() => {
    app.listen(config.port,
      () => console.log(`Server is running on port: ${config.port}`))
  });
  