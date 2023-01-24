const mongoonse = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoonse.Schema(
    {   
        rol: { type: String, default:"user", required: false},
        nombre: {type: String, trim: true, required: true},
        apellidos: {type: String, trim: true, required: true},
        correo:{type: String, trim: true, required: true, unique: true},
        password: { type: String, required: true },
        nacimiento: {type: String, trim: true, required: true},
        imagen: {type: String, default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"}

    },
    {
        timestamps: true, collection: "usuarios"
    }
);

userSchema.pre("save", function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});



const Usuario = mongoonse.model("usuarios", userSchema);
module.exports = Usuario;