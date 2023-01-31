const {Router} = require('express');
const router = Router();

const { getAllDogs } = require("../controllers/dogsController");

router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params;
    try {        
            let results = await getAllDogs();
            let totalDogs = results.find((elem) => elem.id == (id));
            
            res.status(200).json(totalDogs)
            }        
    catch (error) {
        res.status(404).send(error.message)
    }
})

router.get('/dogs', async (req, res) => {
    const {name} = req.query
    try {
        let results = await getAllDogs();
        let totalDogs = results.find((elem) => elem.name == (name));
                
        res.status(200).json(totalDogs);    
    } catch (error) {
        res.status(400).json({error:error.message});        
    }
});

module.exports = router;