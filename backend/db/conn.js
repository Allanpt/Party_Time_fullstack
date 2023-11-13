const mongoose = require("mongoose")

async function main(){

    try {

        await mongoose.connect("mongodb+srv://allanpt:LGifHxK7RREvhSE9@cluster0.9ckj7tq.mongodb.net/?retryWrites=true&w=majority")
        
        console.log("Conectado ao Banco")
    } catch (error) {
        console.log(`Erro: ${error}`)
    }
}

module.exports = main