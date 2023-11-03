// bring in the Sequelzie model
const db = require("../models")

const {Services} = db.sequelize.models;


const addService = async (req, res) =>{
    try {
        const {name, description, price} = req.body;
        const createdService = await Services.create({
            name,
            description,
            price
        })

        res.status(200).json(createdService)
    } catch (error) {
        res.status(500).json("An error occured while creating Service")
    }
}


const getServices = async(req, res) =>{
    try {
        const services = await Services.findAll();
        res.status(200).json(services)
    } catch (error) {
        res.status(500).json("An error occured while getting Service")
    }
}

