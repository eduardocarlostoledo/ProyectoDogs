const {Router} = require('express');
const router = Router();

const { getAllDogs } = require("../controllers/dogsController");
const { createDog } = require("../controllers/dogsController");
const { allTemps } = require("../controllers/dogsController");

router.get('/temperament', async (req, res) => {
    try {
        const temps = await allTemps();
        res.status(200).send(temps);
    } catch (error) {
        res.status(404).send(error.message);
    }
})
 
router.post("/dog", async (req, res) => {
  try {
    let dog = req.body;
    console.log(dog);
    const newDog = await createDog(dog);
    res.status(201).send({ status: "OK", data: dog });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

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
        let results = await getAllDogs(name);
                
        res.status(200).json(results);    
       
    } catch (error) {
        res.status(400).json({error:error.message});        
    }
});

router.delete("/delete/:idRaza", async (req, res) => {;
    const { idRaza } = req.params
    try {
        if(!idRaza || idRaza === ":idRaza") return res.json({msg: "Falta un id para eliminar al perro"})
        let deleteDog = await Dog.destroy({
            where: { id: idRaza }
        })        
        return res.status(200).json({msg: 'Dog Deleted'})
    } catch (error) {
        res.status(400).json({error:error.message});        
    }
});

module.exports = router;