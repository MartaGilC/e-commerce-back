const express = require("express");
const Beauty = require("./beauty.model");
const router = express.Router();
const { isAuth, isAdmin } = require("../../middlewares/auth");

router.get("/", async(req, res) => {
    try {
        const maquillaje = await Beauty.find();
        return res.status(200).json(maquillaje)
    } catch (error) {
        return res.status(500).json("Error al conectar servidor");
    }
})

router.get("/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const maquillajeId = await Beauty.findById(id);
        return res.status(200).json(maquillajeId);
    } catch (error) {
        return res.status(500).json(error)
    }
});

router.post("/create", async(req, res) => {
    try {
        const maquillaje = req.body;
        const nuevoArticulo = new Beauty(maquillaje);
        const creado = await nuevoArticulo.save();
        return res.status(200).json(creado);
    } catch (error) {
        return "error al crear el artículo", error;
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await Beauty.findByIdAndDelete(id);
        return res.status(200).json("Artículo eliminado")
    } catch (error) {
        return res.status(500).json("Error al eliminar artículo")
    }
});

router.put("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const maquillaje = req.body;
        const maquillajeModificado = new Beauty(maquillaje);
        maquillajeModificado._id = id;
        const maquillajeActualizado = await Beauty.findByIdAndUpdate(id, maquillajeModificado);
        return res.status(200).json({
            mensaje: "Se ha modificado el artículo",
            artículoNuevo: maquillajeActualizado,
        })
    } catch (error) {
        return res.status(500).json("No se pudo modificar el artículo")
    }
})


module.exports = router