const express = require("express");
const Usuario = require("./user.model");
const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const usuarios = await Usuario.find();
        return res.status(200).json(usuarios)
    } catch (error) {
        return res.status(500).json("Error al buscar los usuarios");
    }
});

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
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id);
        return res.status(200).json({
            mensaje: "Usuario modificado",
            usuarioNuevo: usuarioActualizado,
        })
    } catch (error) {
        return res.status(500).json("No se puede modificar el usuario")
    }
})
module.exports = router 