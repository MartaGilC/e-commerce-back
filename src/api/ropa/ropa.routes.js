const express = require("express");
const Prenda = require("./ropa.model");
const { isAuth, isAdmin } = require("../../middlewares/auth");

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const todasPrendas = await Prenda.find();
        return res.status(200).json(todasPrendas)
    } catch (error) {
        return res.status(500).json("Error al conectar servidor");
    }
});

router.get("/:id", async(req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const prendaId = await Prenda.findById(id);
        return res.status(200).json(prendaId);
    } catch (error) {
        return res.status(500).json(error);
    }
})

router.post("/create",async (req, res) => {
    try {
        console.log(req.body)
    const prenda = req.body;
    console.log(req.body)
    const nuevaPrenda = new Prenda(prenda);
    console.log(nuevaPrenda);
    const creado = await nuevaPrenda.save();
return res.status(200).json(creado);
    } catch (error) {
    return "error al crear ropa", error;
    }
});

router.delete("/delete/:id",[isAdmin], async (req, res) => {
    try{
        const id = req.params.id;
        await Prenda.findByIdAndDelete(id);
        return res.status(200).json("Prenda eliminada")
    } catch(error){
        return res.status(500).json("Error al eliminar prenda")
    }
})

router.put("/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const prenda = req.body;
        const prendaModificada = new Prenda(prenda);
        prendaModificada._id = id;
        const prendaActualizada = await Prenda.findByIdAndUpdate(id, prendaModificada);
        return res.status(200).json({
            mensaje: "Se ha modificado la prenda",
            prendaNueva: prendaActualizada,
        })
    } catch (error) {
        return res.status(500).json("No se pudo modificar la prenda")
    }
})

module.exports = router