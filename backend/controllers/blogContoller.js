// bring in the Sequelzie model
db = require("../models")

// Destructure models
const {Blog} = db.sequelize.models

// get all blog post
const getAllBlog = async(req, res) =>{
    try{
        
    const posts = await Blog.findAll();
    res.status(200).json(posts)

    }catch(error){
        // send error back
       res.status(500).json("An error occured while getting posts")
    }
   
}

// add new blog post
const addNew = async (req, res) =>{
    
    // destructure request body
    const {title, content, image} = req.body;
    // handle exceptions 
    try {
     // save post to database
       const post = await Blog.create({
        title,
        content,
        image
    })
    // resend post back
     res.status(200).json(post)
    } catch (error) {
        // send error back
        res.status(500).json("An error occured while getting posts")

    }

}

// edit route
const editPost = async(req, res) =>{
    // get id from params
   const id = req.params.id;
   // destructure req body
   const {title, content, image} = req.body;
   // handle exceptions
   try {
       // update post in database
       const updatedPost = await Blog.update({
           title,
           content,
           image
       }, {where: {postId: id}}
       )
        // send back message
       res.status(200).json(updatedPost)
   } catch (error) {
       // send back error message
       res.status(500).json("An error occured")
       
   }
   
}

// edit route
const deletePost = async (req, res) =>{
    
    // get id from params
    const id = req.params.id;
    // handle exceptions
    try {
        // delete post in database
        const deletedPost = await Blog.destroy({where: {postId: id}})
        
         // send back message
        res.status(200).json(deletedPost)
    } catch (error) {
        // send back error message
        res.status(500).json("An error occured")
        
    }

}

module.exports = {
    getAllBlog,
    addNew,
    editPost,
    deletePost
}