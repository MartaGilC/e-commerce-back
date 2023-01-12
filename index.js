const express = require("express");
const { connectDB } = require("./src/utils/db/db");
require("dotenv").config();
const cors = require('cors');
const RutaRopa = require("./src/api/ropa/ropa.routes");
const RutaUser = require("./src/api/users/user.routes")

const server = express();
const PORT = process.env.PORT;
connectDB();



server.use(express.json());
server.use(express.urlencoded({ extended: false }));


server.use("/ropa", RutaRopa);
server.use("/usuarios", RutaUser);

server.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})

