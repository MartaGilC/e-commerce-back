const mongoose = require("mongoose");

const beautySchema = new mongoose.Schema(
    {
        nombre: {type: String, trim: true, enum: ["pintalabios", "bronceador", "sombra de ojos", "colorete", "iluminador"], required: true },
        marca: {type: String, trim: true},
        color: {type: String, trim: true, enum: ["rojo", "rosa", "marrón", "azul", "morado"]},
        precio: { type: Number, trim: true, required: true},
        imagen: {type: String, trim: true, required: true},
        imagen1: {type: String, trim: true},
        imagen2: {type: String, trim: true}

    },
    {
        timestamps: true, collection: "maquillajes"
    }
);

const Beauty = mongoose.model("maquillajes", beautySchema);
module.exports = Beauty;
