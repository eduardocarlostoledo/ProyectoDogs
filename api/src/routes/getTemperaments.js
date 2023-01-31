const {Router} = require('express');
const router = Router();

const { allTemps } = require("../controllers/dogsController");

router.get('/temperament', async (req, res) => {
    try {
        const temps = await allTemps();
        res.status(200).send(temps);
    } catch (error) {
        res.status(404).send(error.message);
    }
})

module.exports = router;