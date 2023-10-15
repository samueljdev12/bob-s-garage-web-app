// this is the entry main point file for the backend
// it contains app routes
const express = require('express');
const cors = require('cors');
// initialize app
const app = express();
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

// feedback routes
// add a new feedback route
app.post("/server/feedback/add/:userId", feedbackController.addFeedback);

// get alll feedbacks
app.get("/server/feedback/all/:userId", feedbackController.getAllFeedback)

// edit feedback endpoint
app.post("/server/feedback/edit/:feedId", feedbackController.deleteFeedback)

// get one feedback
app.get("/server/feedback/:feedId", feedbackController.getFeedback)

// delete feedback
app.post("/server/feedback/:feedId", feedbackController.deleteFeedback)


// bog endpoints
// get all blog post
app.get("/server/blog/all", blogController.getAllBlog)

// add new post
app.post("/server/blog/add", blogController.addNew)

// update post route
app.post("/server/blog/edit/:id", blogController.editPost)

// delete post route
app.post("/server/blog/delete/:id", blogController.deletePost)

// users routes
// signup route
app.post("/server/signup", userController.signup)

//login route
app.post("/server/login", userController.login)


// server 
db.sequelize.sync().then(() => {
    app.listen(config.port,
      () => console.log(`Server is running on port: ${config.port}`))
  });
  