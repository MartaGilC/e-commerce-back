const mongoonse = require("mongoose");

const userSchema = new mongoonse.Schema(
    {
        nombre: {type: String, trim: true, required: true},
        apellidos: {type: String, trim: true, required: true},
        correo:{type: String, trim: true, required: true},
        nacimiento: {type: String, trim: true, required: true},
        imagen: {type: String, default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"}

    },{
        timestamps: true, collection: "usuarios"
    }
);

const Usuario = mongoonse.model("usuarios", userSchema);
module.exports = Usuario;