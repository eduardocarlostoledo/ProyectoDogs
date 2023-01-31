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
                          weight_min: dogs[index].weight_min,
                          weight_max: dogs[index].weight_max,
                          height_min: dogs[index].height_min,
                          height_max: dogs[index].height_max,
                          life_span_min: dogs[index].life_span_min,
                          life_span_max: dogs[index].life_span_max,
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
      let dogsFromApi = await dogIdApi();           
      let dogsFromDb = await getDogIdDb();          
      let allDogs = [...dogsFromDb, ...dogsFromApi];      
      resultId = allDogs.find((element) = element.id == id)      
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

//   async function dogsByDatabase(name){ // me traigo todo de la base de datos incluyendo los temperamentos
//    if (name) {
//     let dog = await Dog.findAll({where:{name:{[Op.iLike]: '%' + name + '%' }}}) //esto me busca ignorando MatchCase
//    } else {
//     return await Dog.findAll({
//       include: {
//           model: Temperamento,
//           attributes: ['name'],
//           through: {
//               attributes: [],
//           },
//       }
//   });
//    }    
// };

async function dogsByDatabase(){ 
  return await Dog.findAll({
      include: {
          model: Temperamento,
          attributes: ['temperament'],
          through: {
              attributes: [],
          },
      }
  });
};
 
const getAllDogs = async(name) => { 
  results1 = await apiDogs()
  results2 = await dogsByDatabase()  
  results = (results2).concat(results1);
   
  if (name) {          

    for (let index = 0; index < results.length; index++) {

      if ( results[index].name==name ) {        
        return { 
                    id: results[index].id,
                    name: results[index].name,
                    height_min: results[index].height_min,
                    height_max: results[index].height_max,
                    weight_min: results[index].weight_min,
                    weight_max: results[index].weight_max,
                    life_span_min: results[index].life_span_min,
                    life_span_max: results[index].life_span_max,
                    image: results[index].image,//saco .url
                    temperament: results[index].temperament
        }
      }
    }  
  } else {     
    return results;
  }
}
            
const createDog = async (name, height_min, height_max, weight_min, weight_max, life_span_min, life_span_max, image, temperament) => {
    if (!name || !height_min || !weight_max || !life_span_min || !height_max || !weight_min || !life_span_max || !temperament) {
      throw new Error(
        "Faltan datos para registrar un nuevo perro en la base de datos"
      );
    } else {
    try {
      const newDog = await Dog.create({
        name,        
        height_min,
        height_max,
        weight_min,
        weight_max,        
        life_span_min,
        life_span_max,
        image,        
      });
      const newDogTemperamento = await Temperamento.create({
        temperament
      });
      return (newDog);
      }   
     catch (error) {
      throw new Error(`Error al crear un nuevo perro: ${error.message}`);
    }
  };
}
const allTemps = async () => {
  const temps = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

  temps.data.forEach(elem => { 
        if (elem.temperament) {
            let temps = elem.temperament.split(', ');

            temps.forEach(e => {
                Temperamento.findOrCreate({
                    where: { temperament: e }
                })
            })
        }
    });
    const findTemps = await Temperamento.findAll();
    return findTemps;
}

module.exports = {apiDogs, dogsByDatabase, getAllDogs, dogIdApi, getDogIdDb, getAllDogsID, createDog, allTemps}