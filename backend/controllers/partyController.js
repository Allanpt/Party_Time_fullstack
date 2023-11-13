const PartyModel = require("../models/Party")

const checkPartyBudget = (budget, services) => {
    
    const priceSum = services.reduce((sum, service) => sum + service.price, 0)

    console.log(priceSum, budget)
    if(priceSum > budget){
        console.log("Orçamento insuficiente")
        return false;
    }

    return true;
}

const partyController = {
    create: async (req, res) => {
        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,

            }
            
            if(party.services && !checkPartyBudget(party.budget, party.services)){
                res.status(406).json({msg: "O seu orçamento é insuficiente"})
                return
            }

            const response = await PartyModel.create(party)

            res.status(201).json({response, msg: "Festa criada com sucesso!"})
        } catch (error) {
            console.error(error)
            console.log(`A Festa não foi criada ${error}`)
            
        }
    },
    getAll: async (req, res) => {
        try {
            const parties = await PartyModel.find()

            res.json(parties)
        } catch (error) {
            console.log(error)
        }
    },
    getById: async (req, res) => {
        try {

            const id = req.params.id
            const party = await PartyModel.findById(id)

            if(!party){
                res.status(404).json({msg: "Festa não encontrada"});
                return;
            }

            res.json(party)
        } catch (error) {
            console.log(error)
        }
    },
    deleteById: async (req, res) => {
        try {

            const id = req.params.id
            const party = await PartyModel.findById(id)

            if(!party){
                res.status(404).json({msg: "Festa não encontrada"});
                return;
            }

            const deleteParty = await PartyModel.findByIdAndDelete(id)

            res.status(200).json({deleteParty, msg: "Festa deletada com sucesso"})
        } catch (error) {
            console.log(error)
        }
    },
    updateById: async (req, res) => {
        try {

            const id = req.params.id
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,

            }

            if(party.services && !checkPartyBudget(party.budget, party.services)){
                res.status(406).json({msg: "O seu orçamento é insuficiente"})
                return
            }

            const updateParty = await PartyModel.findByIdAndUpdate(id, party)

            if(!updateParty){
                res.status(404).json({msg: "Festa não encontrada"});
                return;
            }

            res.status(200).json({updateParty, msg: "Festa atualizada com sucesso"})
        } catch (error) {
            console.log(`Festa NÃO foi atualizada por conta de : ${error}`)
        }
    },
}

module.exports = partyController