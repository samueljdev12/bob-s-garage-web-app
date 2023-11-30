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
const servicesController = require("./controllers/SerVicesController");

//auth module
const authenticate = require('./middleware/authenticate');
// authorize module
const authorize = require('./middleware/authorize');

// feedback routes
app.post("/server/feedbacks/new", auth, feedbackController.addFeedback);
app.get("/server/feedbacks", feedbackController.getAllFeedback)
app.delete("/server/feedbacks/delete/:id", [authenticate, authorize], feedbackController.deleteFeedback)
app.get("/server/feedbacks/feedback/:id",[auth, authorize], feedbackController.getFeedback)
app.put("/server/feedbacks/edit/:id", authenticate, feedbackController.editFeedback);



// bog routes
app.get("/server/blog/all", blogController.getAllBlog);
app.post("/server/blog/add", [authenticate, authorize], blogController.addNew);
app.put("/server/blog/edit/:id",[authenticate, authorize], blogController.editPost);
app.delete("/server/blog/delete/:id", [authenticate, authorize], blogController.deletePost);
app.get("/server/blog/post/:id",[auth, authorize], blogController.getPost);


//user routes
app.post("/server/login", userController.login)
app.get("/server/user", auth, userController.getUser)
app.post("/server/signup", userController.signup)
app.post("/server/user/edit", auth, userController.updateUser)
app.get("/server/users", userController.getAllUsers);


// services routes
app.get("/server/services", servicesController.getServices);
app.post("/server/services/new", [authenticate, authorize], servicesController.addService)
app.put("/server/services/edit/:id", [authenticate, authorize], servicesController.updateService);
app.delete("/server/services/delete/:id", [authenticate, authorize], servicesController.deleteService)
app.get("/server/services/service/:id", [auth, authorize], servicesController.getService);

// server 
db.sequelize.sync().then(() => {
    app.listen(config.port,
      () => console.log(`Server is running on port: ${config.port}`))
  });
  