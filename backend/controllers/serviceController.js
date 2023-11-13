const {Service: ServiceModel} = require("../models/Service")

const serviceController = {
    create: async (req, res) => {
        try {
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            }

            const response = await ServiceModel.create(service)

            res.status(201).json({response, msg: "Serviço criado com sucesso!"})
        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const services = await ServiceModel.find()

            res.json(services)
        } catch (error) {
            console.log(error)
        }
    },
    getById: async (req, res) => {
        try {

            const id = req.params.id
            const service = await ServiceModel.findById(id)

            if(!service){
                res.status(404).json({msg: "Serviço não encontrado"});
                return;
            }

            res.json(service)
        } catch (error) {
            console.log(error)
        }
    },
    deleteById: async (req, res) => {
        try {

            const id = req.params.id
            const service = await ServiceModel.findById(id)

            if(!service){
                res.status(404).json({msg: "Serviço não encontrado"});
                return;
            }

            const deleteService = await ServiceModel.findByIdAndDelete(id)

            res.status(200).json({deleteService, msg: "Serviço deletado com sucesso"})
        } catch (error) {
            console.log(error)
        }
    },
    updateById: async (req, res) => {
        try {

            const id = req.params.id
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            }

            const updateService = await ServiceModel.findByIdAndUpdate(id, service)

            if(!updateService){
                res.status(404).json({msg: "Serviço não encontrado"});
                return;
            }

            res.status(200).json({updateService, msg: "Serviço atualizado com sucesso"})
        } catch (error) {
            console.log(`Serviço NÃO foi atualizado por conta de : ${error}`)
        }
    },
}

module.exports = serviceController