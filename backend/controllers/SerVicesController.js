// bring in the Sequelzie model
const db = require("../models")

const {Service} = db.sequelize.models;

// add services
const addService = async (req, res) =>{
    try {
        const {name, description, price} = req.body;
        const createdService = await Service.create({
            name,
            description,
            price
        })

        res.status(200).json(createdService)
    } catch (error) {
        res.status(500).json("A server error occured while creating Service")
    }
}


// get all services
const getServices = async(req, res) =>{
    try {
        const services = await Service.findAll();
        res.status(200).json(services)
    } catch (error) {
        res.status(500).json("A server error occured while getting Service")
    }
}

// delete service
const deleteService = async (req, res) =>{
    let id = req.params.id;
    id = parseInt(id);
  
    try {
         const service = await Service.destroy({where: {serviceId: id}})
         res.status(200).json(id)
    } catch (error) {
        res.status(500).json("A server error occured while deleting server")
    }
}

// get one service by id
const getService = async (req, res) => {
    try {
      let serviceId = req.params.id;
       serviceId = parseInt(serviceId)
      const service = await Service.findByPk(serviceId);
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json("A server error occured")
    }
  };

// update service
const updateService = async (req, res) =>{
    let id = req.params.id;
    id = parseInt(id);

    const {name, description, price} = req.body;
    try {
        const service = await Service.update({name, description, price}, {where: {serviceId: id}})
        const updateService = await Service.findByPk(id);
        console.log(updateService)
        res.status(200).json(updateService)
    } catch (error) {
        res.status(500).json("A server error occured while updating service")
    }
}

module.exports = {
    addService,
    getServices,
    updateService,
    deleteService,
    getService
}