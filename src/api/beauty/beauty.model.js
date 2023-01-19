const mongoose = require("mongoose");

const beautySchema = new mongoose.Schema(
    {
        nombre: {type: String, trim: true, enum: ["pintalabios", "sombra de ojos", "colorete", "iluminador"], required: true },
        color: {type: String, trim: true, enum: ["rojo", "rosa", "marrón", "azul", "morado"]},
        precio: { type: Number, trim: true, required: true},
        imagen: {type: String, trim: true, required: true}
    },
    {
        timestamps: true, collection: "maquillajes"
    }
);

const Beauty = mongoose.model("maquillajes", beautySchema);
module.exports = Beauty;
