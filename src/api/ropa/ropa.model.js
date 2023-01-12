const mongoonse = require("mongoose");

const prendaSchema = new mongoonse.Schema(
    {
        tipo: { type: String, trim: true, required: true, enum:["abrigo", "camisa", "pantalón", "vestido", "lenceria"] },
        color: { type: String, trim: true, required: true },
        precio: { type: Number, trim: true, required: true},
        talla: { type: String, trim: true, required: true, enum:["xs","s", "m", "l", "xl", "xxl"]},
        imagen: { type: String, trim: true, required: true}
    },
    {
        timestamps: true, collection: "prendas"
    }
);

const Prenda = mongoonse.model("prendas", prendaSchema);
module.exports = Prenda;