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

// Bring in Bcrypt
const bcrypt = require('bcrypt');

// bring in jwt
const jwt = require('jsonwebtoken');

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
app.post("/server/feedback/add/:userId", async (req, res)=>{
    
    try {

        // get form data
    const {content} = req.body;
    // get user id
    let UserUserId = req.params.userId;
    UserUserId = parseInt(UserUserId)
    const createdFeedback = await Feedback.create({
        content,
        UserUserId

    })

    res.status(200).json(createdFeedback)

    // check if the user already left  feedback
    // const hasFeedback = await Feedback.findOne({where: {UserUserId: userId}})
    // if(hasFeedback){
    //     res.send("user has no feedback")
    // }
        
    } catch (error) {
        
        console.log(error)
         // send error back
       res.status(500).json("An error occured while creatinf feedback")
        
    }
    


   
})

// get alll feedbacks
app.get("/server/feedback/all/:userId", async (req, res) =>{
    try {
        const feedbacks = await Feedback.findAll()
        res.send(feedbacks)
    } catch (error) {
        res.send(error)
    }
})

// edit feedback endpoint


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

// feed back routes
//get all feedbacks
app.get("/server/feedback/all", (req, res) =>{
    res.send("all feed backs")
})


// users routes
// signup route
app.post("/server/signup", async (req, res) =>{
     
   try {
    
    const {firstName, lastName, email, password} = req.body;
    // check if user exists
    const user = await User.findOne({where: {email: email}});
    // send message back if user exists
    if(user){
        res.status(400).json({errors: [{msg: "User already exists"}]})
    }

    // create a new user object
    const newUser = {
        firstName,
        lastName,
        email,
        password,
        isAdmin: false
    }

    // has password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // save user to databse
    const userRes = await User.create({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        isAdmin: newUser.isAdmin
    })

    // create a payload
    const payload = {
        userId: userRes.userId,
        firstName: userRes.firstName,
        lastName: userRes.lastName,
        email: userRes.email,
        isAdmin: userRes.isAdmin
    }

    // sogn the JWT token 
    jwt.sign(payload, config.auth.jwtSecret, 
    {
        expiresIn: '5d',
        algorithm: 'HS512'
    }, 
    (err, token) =>{
        if(err) throw err
        res.json(token)
    }
    )

   } catch (error) {
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
   }




})

//login route
app.post("/server/login", async (req, res) => {
    
    try {
        
         
    // geting information from post body
    const {email, password} = req.body;
    // find user in databse
    let user = await User.findOne({where: {email: email}})

    // check if user exists and send message when crenddentials are incorretc
    if(!user){
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}]});
    }

    const isMatch = await bcrypt.compare(password, user.password)

    // Send a message back if the password is incorrect.
    if (!isMatch){
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}]});
      }

       // create a payload
    const payload = {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin
    }

    // sign payload with jwt
    jwt.sign(payload, config.auth.jwtSecret, 
        {
          expiresIn: '5d',
          algorithm: 'HS512'
        },
        (err, token) => {
          if(err) throw err;
          res.json({ token });
        }
        );

    } catch (error) {
    // Send back an error message.
    console.error(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  


    
})



db.sequelize.sync().then(() => {
    app.listen(config.port,
      () => console.log(`Server is running on port: ${config.port}`))
  });
  