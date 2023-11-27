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

// delete service
const deleteService = async (req, res) =>{
    let id = req.params.id;
    id = parseInt(id);
  
    try {
         const service = await Service.destroy({where: {serviceId: id}})
         res.status(200).json(service)
    } catch (error) {
        res.status(500).json(error)
    }
}

// update service
const updateService = async (req, res) =>{
    let id = req.params.id;
    id = parseInt(id);

    const {name, description, price} = req.body;
    try {
        const service = await Service.update({name, description, price}, {where: {serviceId: id}})
        res.status(200).json(service)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    addService,
    getServices,
    updateService,
    deleteService
}