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

// Destructure models
const {User, Service, Blog, Feedback} = db.sequelize.models

// get all feedbacks route
app.get("/server/feedback", (req, res) =>{
    res.send("This is get all feedback routes")
})

// add a new feedback route
app.post("/server/feedback/add", (req, res)=>{
    res.send("this is the add feedback route")
})

// get all blog post
app.get("/server/blog/all", async(req, res) =>{
    
    try{
        
    const posts = await Blog.findAll();
    res.status(200).json(posts)

    }catch(error){
        // send error back
       res.status(500).json("An error occured while getting posts")
    }
    
   
})

// add new post
app.post("/server/blog/add", async (req, res) =>{
    
    // destructure request body
    const {title, content} = req.body;
    // handle exceptions 
    try {
     // save post to database
       const post = await Blog.create({
        title,
        content
    })
    // resend post back
     res.status(200).json(post)
    } catch (error) {
        // send error back
        res.status(500).json("An error occured while getting posts")

    }

})

// update post route
app.post("/server/blog/edit/:id", async(req, res) =>{
     // get id from params
    const id = req.params.id;
    // destructure req body
    const {title, content} = req.body;
    // handle exceptions
    try {
        // update post in database
        const updatedPost = await Blog.update({
            title,
            content
        }, {where: {postId: id}}
        )
         // send back message
        res.status(200).json("post updated succesfully")
    } catch (error) {
        // send back error message
        res.status(500).json("An error occured")
        
    }
    

})

// delete post route
app.post("/server/blog/delete/:id", async (req, res) =>{
    
     // get id from params
     const id = req.params.id;
     // handle exceptions
     try {
         // delete post in database
         const deletedPost = await Blog.destroy({where: {postId: id}})
         
          // send back message
         res.status(200).json("post deleted succesfully")
     } catch (error) {
         // send back error message
         res.status(500).json("An error occured")
         
     }

})


app.post("server/login", (req, res) => {
    res.send("Hello from the login page")
})



db.sequelize.sync().then(() => {
    app.listen(config.port,
      () => console.log(`Server is running on port: ${config.port}`))
  });
  