const { db } = require("../config/config");

// bring in the Sequelzie model
db = require("../models")

// Destructure models
const {Feedback, User} = db.sequelize.models

const addFeedback = async (req, res)=>{
    
    try {

        // get form data
    const {content, UserUserId} = req.body;
    
    // get user id
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
}

// get all feedbacks
const getAllFeedback = async (req, res) =>{
    try {
        const feedbacks = await Feedback.findAll({
            include: User
        })
        res.send(feedbacks)
    } catch (error) {
        res.send(error)
    }
}

// get one feed back
const getFeedback = async(req, res) =>{
    try {

        let feedId = req.params.feedId;
        const feedback = await Feedback.findOne({where: {feedId: feedId}})
        console.log(typeof(feedId))
        console.log(feedId);
        res.send(feedback)
        
    } catch (error) {
        console.log(error)
    }
}

//  edit feedback 
const editFeedback = async (req, res) => {
    res.send("update feedback")
}

// delete feedback
const deleteFeedback = async(req, res) =>{
    res.send("delete feedback")
}

module.exports = {
    addFeedback,
    getAllFeedback,
    getFeedback,
    deleteFeedback
}