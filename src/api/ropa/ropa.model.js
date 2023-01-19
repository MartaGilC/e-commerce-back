const mongoonse = require("mongoose");

const prendaSchema = new mongoonse.Schema(
    {   nombre: { type: String, trim: true, required: true},
        tipo: { type: String, trim: true, required: true, enum:["Abrigo", "Camisa", "Pantalón", "Vestido", "Lenceria"] },
        color: { type: String, trim: true, required: true },
        precio: { type: Number, trim: true, required: true},
        talla: { type: String, trim: true, required: true, enum:["XS","S", "M", "L", "XL", "XXL"]},
        imagen: { type: String, trim: true, required: true},
        imagen1: { type: String, trim: true},
        imagen2: { type: String, trim: true}
    },
    {
        timestamps: true, collection: "prendas"
    }
);

const Prenda = mongoonse.model("prendas", prendaSchema);
module.exports = Prenda;