const mongoonse = require("mongoose");
require("dotenv").config();

mongoonse.set('strictQuery', true)
const DB_URL = process.env.DB_URL;



const connectDB = async () => {
    try {
        
        const db = await mongoonse.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const { name, host } = db.connection;
        console.log(`Conectado con éxito a la db. ${name} en ${host}`)

        
    } catch (error) {
        console.log("Error al conectarse a la base de datos", error)
    }

}

module.exports = {
    connectDB,
    DB_URL
}