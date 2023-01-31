const {Router} = require('express');
const router = Router();

const { createDog } = require("../controllers/dogsController");



//router.post("/dog", async (req, res) => { action
router.post("/dog", async (req, res) => {
    try {
        const { name, height, weight, life_span, temperament } = req.body;
        const newDog = await createDog(name, height, weight, life_span, temperament);
        return res.status(201).json({ message: "Perro creado con éxito", newDog });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});


module.exports = router;