// bring in the Sequelzie model
db = require("../models");
const { blogSchema } = require("../utilities/validate");
// Destructure models
const { Blog } = db.sequelize.models;

// get all blog post
const getAllBlog = async (req, res) => {
  try {
    const posts = await Blog.findAll();
    res.status(200).json(posts);
  } catch (error) {
    // send error back
    res.status(500).json("A server error occured while getting post");
  }
};

// get one post by id
const getPost = async (req, res) => {
  try {
    let postId = req.params.id;
    postId = parseInt(postId);
    const feedback = await Blog.findByPk(postId);
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json("A server error occured");
  }
};

// add new blog post
const addNew = async (req, res) => {
  // destructure request body
  const { title, content, image } = req.body;
  //clean data

  
  // handle exceptions
  try {
    const { error, value } = blogSchema.validate(req.body, {
      abortEarly: true,
    });
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    // save post to database
    const post = await Blog.create({
      title,
      content,
      image,
    });
    // resend post back
    res.status(200).json(post);
  } catch (error) {
    // send error back
    res.status(500).json("A server error occured while adding post");
  }
};

// edit route
const editPost = async (req, res) => {
  // get id from params
  let id = req.params.id;
  id = parseInt(id);
  // destructure req body
  // handle exceptions
  try {

    const { error, value } = blogSchema.validate(req.body, {
      abortEarly: true,
    });
    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const { title, content, image } = req.body;

    // update post in database
    const updatedPost = await Blog.update(
      {
        title,
        content,
        image,
      },
      { where: { postId: id } }
    );

    const post = await Blog.findByPk(id);
    // send back message
    res.status(200).json(post);
  } catch (error) {
    // send back error message
    res.status(500).json("A server error occured while editng post");
  }
};

// edit route
const deletePost = async (req, res) => {
  // get id from params
  let id = req.params.id;
  id = parseInt(id);
  // handle exceptions
  try {
    // delete post in database
    const deletedPost = await Blog.destroy({ where: { postId: id } });

    // send back message
    res.status(200).json(id);
  } catch (error) {
    // send back error message
    res.status(500).json("A server error occured while deleting post");
  }
};

module.exports = {
  getAllBlog,
  addNew,
  editPost,
  deletePost,
  getPost,
};
