// bring in the Sequelzie model
const { where } = require("sequelize");
const db = require("../models");

// Destructure models
const { Feedback, User } = db.sequelize.models;

const addFeedback = async (req, res) => {
  try {
    // get form data
    const { content, UserUserId } = req.body;
    // const feedback = await Feedback.findOne({ where: { feedId: feedId } });
    // get user id
    const createdFeedback = await Feedback.create({
      content,
      UserUserId,
    });

    res.status(200).json(createdFeedback);
  } catch (error) {
    console.log(error);
    // send error back
    res.status(500).json("An error occured while Adding feedback feedback");
  }
};

// get all feedbacks
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      include: User,
    });

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json("An error occured while getting feedbacks try again!!");
  }
};

// get one feed back
const getFeedback = async (req, res) => {
  try {
    let feedId = req.params.id;
    const feedback = await Feedback.findOne({ where: { feedId: feedId } });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json("A server error occured")
  }
};

//  edit feedback
const editFeedback = async (req, res) => {
  let id = req.params.id;
  id = parseInt(id)

  const { content, UserUserId } = req.body;
  try {
    const [rowCount, feedback] = await Feedback.update({content, UserUserId}, {where: {feedId: id}});
    if(rowCount === 0){
      return res.status(400).json("Feedback not found");
    }
    const feed = await Feedback.findByPk(id);
    res.status(200).json(feed)
  } catch (error) {
    res.status(500).json("An error occured while updatinf feeedback")
  }

};

// delete feedback
const deleteFeedback = async (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    console.log(id)
    try {
        const feedback = await Feedback.destroy({where: {feedId: id}})
        res.status(200).json(id)
    } catch (error) {
        res.status(500).json("An error occured while deleting feedback")
    }
  
};

module.exports = {
  addFeedback,
  getAllFeedback,
  getFeedback,
  deleteFeedback,
  editFeedback
};
