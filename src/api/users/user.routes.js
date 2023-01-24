const express = require("express");
const Usuario = require("./user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt/jwt");
const { isAuth, isAdmin } = require("../../middlewares/auth");


router.get("/", [isAdmin], async(req, res) => {
    try {
        const usuarios = await Usuario.find();
        return res.status(200).json(usuarios)
    } catch (error) {
        return res.status(500).json("Error al buscar los usuarios");
    }
});

router.post("/login", async (req, res) => {
    try {
    const userDB = await Usuario.findOne({ correo: req.body.correo });
    if (!userDB) {
        return res.status(404).json("No existe el usuario");
    }
    if (bcrypt.compareSync(req.body.password, userDB.password)) {
        const token = generateSign(userDB._id, userDB.correo);
        return res.status(200).json({ token, userDB });
    } else {
        return res.status(200).json("La contraseña es incorrecta");
    }
    } catch (error) {
    return res.status(500).json("Error al loguear el usuario");
    }})


    router.post("/logout", async (req, res) =>{
        try {
            const token = null;
            return res.status(200).json(token);
        } catch (error) {
            return res.status(500).json(error);
        }
    })

router.get("/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const userId = await Usuario.findById(id);
        return res.status(200).json(userId);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.post("/create", async (req, res) => {
    try {
        const usuario = req.body;
        const nuevoUsuario = new Usuario(usuario);
        const creado = await nuevoUsuario.save();
        return res.status(200).json(creado);
    } catch (error) {
        return "error al crear el usuario", error;
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await Usuario.findByIdAndRemove(id);
        return res.status(200).json("Usuario eliminado")
    } catch (error) {
        return res.status(500).json("Error al eliminar usuario")
    }
})

router.put("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = req.body;
        const usuarioModificado = new Usuario(usuario);
        usuarioModificado._id = id;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, usuarioModificado);
        return res.status(200).json({
            mensaje: "Usuario modificado",
            usuarioNuevo: usuarioActualizado,
        })
    } catch (error) {
        return res.status(500).json("No se puede modificar el usuario")
    }
})

router.post("/checksession", [isAuth], (req, res, next) => {
    try {
    return res.status(200).json(req.user);
    } catch (error) {
    return res.status(500).json(error);
    }
});


module.exports = router 