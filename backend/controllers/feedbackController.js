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
    res.status(500).json("An error occured while creatinf feedback");
  }
};

// get all feedbacks
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      include: User,
    });

    res.send(feedbacks);
  } catch (error) {
    res.send(error);
  }
};

// get one feed back
const getFeedback = async (req, res) => {
  try {
    let feedId = req.params.feedId;
    const feedback = await Feedback.findOne({ where: { feedId: feedId } });
    console.log(typeof feedId);
    console.log(feedId);
    res.send(feedback);
  } catch (error) {
    console.log(error);
  }
};

//  edit feedback
const editFeedback = async (req, res) => {
  let id = req.params.id;
  id = parseInt(id)
  const { content, UserUserId } = req.body;
  try {
    const feedback = await Feedback.update({content, UserUserId}, {where: {feedId: id}});
    res.send(feedback)
  } catch (error) {
    res.status(500).json(error)
  }

};

// delete feedback
const deleteFeedback = async (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    console.log(id)
    try {
        const feedback = await Feedback.destroy({where: {feedId: id}})
        res.send(feedback)
    } catch (error) {
        res.status(500).json(error)
    }
  
};

module.exports = {
  addFeedback,
  getAllFeedback,
  getFeedback,
  deleteFeedback,
  editFeedback
};
