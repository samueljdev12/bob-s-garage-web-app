// bring in the Sequelzie model
const db = require("../models")

const {Service} = db.sequelize.models;


const addService = async (req, res) =>{
    try {
        const {name, description, price} = req.body;
        console.log(name, description, price)
        const createdService = await Service.create({
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
        const services = await Service.findAll();
        
        res.send(services)
    } catch (error) {
        res.status(500).json("An error occured while getting Service")
    }
}

module.exports = {
    addService,
    getServices
}