require('dotenv').config();
const axios = require("axios");
const { Op } = require("sequelize");
const {Dog,Temperamento} = require('../db.js');
const { API_KEY } = process.env

const dogIdApi = async (id) => {
    
    const url =`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
  
    try {
      if (id) {
        console.log("PASE POR try name dogIdApi");
        let arr = await axios.get(url);   
        let dogs = arr.data; 
        console.log("PASE POR dogIdApi TENGO DOGS ARR.DATA");

          for (let index = 0; index < dogs.length; index++) {
            if ( dogs[index].id===id ) {
              console.log("PASE POR tengo TRUE dogIdApi");
              return { 
                          id: dogs[index].id,
                          name: dogs[index].name,
                          weight: dogs[index].weight,
                          height: dogs[index].height,
                          life_span: dogs[index].life_span,
                          image: dogs[index].image.url,
                          temperament: dogs[index].temperament
              };                                       
            } else {
              throw Error ("No se encontró ID suministrado.")
            }; 
          }; 
      } else {
          let arr = await axios.get(url);   
          let dogs = arr.data;
          return dogs;
        } 
    } catch (error) {
      throw Error ("No se encontraron datos en la API");
      }  
};

const getDogIdDb = async (id) => {
  try {      
      if (id) {
        try {
          let dogIdDb = await Dog.findByPk(id);
          return dogIdDb;
        } catch (error) {
          throw error ("No se encontro en la DataBase")
        } 
      } else {
        throw Error ("Debe ingresar el ID del perro para realizar una búsqueda por ese valor.");
      }
      
    } catch (error) {
      throw new Error("Se ha producido un error en la busqueda por ID.");
    }
  }

const getAllDogsID = async (id) => {
    try {
      console.log("entre a TRY getAllDogsID")    
      let dogsFromApi = await dogIdApi();     
      console.log("entre a tengo dogsFromApi")     
      let dogsFromDb = await getDogIdDb();    
      console.log("entre a tengo dogsFromDb")   
      let allDogs = [...dogsFromDb, ...dogsFromApi];
      console.log("entre a tengo allDogs")   
      resultId = allDogs.find((element) = element.id == id)
      console.log("entre a tengo filtrado ID")   
      return resultId;
  
    } catch (error) {  
      throw new Error( "Error al obtener todos los perros desde la API y la DB" );
    }
  }


const apiDogs = async () => {    
    const url =`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;
    let arr = await axios.get(url);   
    let dogs = arr.data;   
    return dogs;
  }
    
const dogsByDatabase = async () => {
  arr = await Dog.findAll();
  return dogsArray = arr.map(dataValues => {
    return {
      id: dataValues.id,
      name: dataValues.name,
      height: dataValues.height,
      weight: dataValues.weight,
      life_span: dataValues.life_span,
      createdAt: dataValues.createdAt,
      updatedAt: dataValues.updatedAt
    }
  });
  
  };  
 
const getAllDogs = async (name) => { 
  results1 = await apiDogs()
  results2 = await dogsByDatabase()
  results = (results2).concat(results1);
  
  if (name) {
    
    for (let index = 0; index < results.length; index++) {
      console.log("GETALLDOGS FOR", results[index].name)

      if ( results[index].name==name ) {        
        return { 
                    id: results[index].id,
                    name: results[index].name,
                    weight: results[index].weight,
                    height: results[index].height,
                    life_span: results[index].life_span,
                    image: results[index].image,//saco .url
                    temperament: results[index].temperament
        }
      }
    }  
  } else {     
    return results;
  }
}
            
const createDog = async (name, height, weight, life_span, temperament) => {
    try {
      if (!name || !height || !weight || !life_span || !temperament) {
        throw new Error(
          "Faltan datos para registrar un nuevo perro en la base de datos"
        );
      }

      const newDog = await Dog.create({
        name,
        height,
        weight,
        life_span        
      });

      const newDogTemperamento = await Temperamento.create({
        name: temperament
      });
  
      return (newDog,newDogTemperamento);
    } catch (error) {
      throw new Error(`Error al crear un nuevo perro: ${error.message}`);
    }
  };

const allTemps = async () => {
  const temps = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

  temps.data.forEach(elem => { 
        if (elem.temperament) {
            let temps = elem.temperament.split(', ');

            temps.forEach(e => {
                Temperamento.findOrCreate({
                    where: { name: e }
                })
            })
        }
    });
    const findTemps = await Temperamento.findAll();
    return findTemps;
}

module.exports = {apiDogs, dogsByDatabase, getAllDogs, dogIdApi, getDogIdDb, getAllDogsID, createDog, allTemps};