import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postDog } from "../../actions";
import style from "./CreateDog.module.css";

export default function Create() {
  const [dog, setDog] = useState({
    name: '',
    weight_min: '',
    weight_max: '',
    height_min: '',
    height_max: '',
    life_span_min: '',
    life_span_max: '',
    image:'',
    temperament: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setDog({ 
      ...dog, 
      [e.target.name]: e.target.value });
  }  
  
  //VALIDACION SI EL PERRO YA EXISTE....
  //este metodo guarda, y despues corrobora, hay q arreglarlo

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.group("handlesubmit");
    try {
    const response = await fetch(`http://localhost:3001/dogs?name=${dog.name}`);
    if (response.status === 200) {
    alert(`${dog.name} ya existe en el registro.`);
    return;
    }
    dispatch(postDog(dog));
    } catch (error) {
    console.error(error);
    }
    console.groupEnd();
    }
    
    
  // //este dispach no valida. si ya existe....
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(postDog(dog));
  // };

//este codigo usa fetch y promesas directo a la ruta
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { postDog } from "../../actions";
// import style from "./CreateDog.module.css";

// export default function Create() {
//   const [dog, setDog] = useState({
//     name: 'Null',
//     weight_min: 0,
//     weight_max: 0,
//     height_min: 0,
//     height_max: 0,
//     life_span_min: 0,
//     life_span_max: 0,
//     image:'Null',
//     temperament: 'Null',
//   });

//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setDog({ 
//       ...dog, 
//       [e.target.name]: e.target.value });
//   }  
// //implemento console group para no tener cada cambio en consola del form

// const handleSubmit = (e) => {
//   e.preventDefault();
//   console.group("handlesubmit");
//   fetch('http://localhost:3001/dog', {
//     method: 'Post',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(dog)
//   }).then(x => console.log(dog,"SEND TO BACKEND"))    
//   console.groupEnd();    
// }
 
return (
    <div >
        <h3 className={style.title}>Create Dog Race</h3>
        <h4 className={style.subtitle}>This is the section to create dog breeds in our own database.
Remember that you must add all the fields following normal parameters within each value.
The required fields are; name of the breed, minimum and maximum weight, minimum and maximum height, and the life expectancy of the breed. You will also need to add the Temperament of the breed, which can be more than one..</h4>
      <form onSubmit={handleSubmit}>
      <label className={style.create}>
        Name:
        <input
          type="text"
          name="name"
          placeholder="Nombre de la Raza"
          value={dog.name}
          onChange={handleChange}
        />
      </label>
      <label className={style.create}>
        Weight (min):
        <input
          type="text"
          name="weight_min"
          placeholder="Peso Mínimo de la raza"
          value={dog.weight_min}
          onChange={handleChange}
        />
      </label>
      <label className={style.create}>
        Weight (max):
        <input
          type="text"
          name="weight_max"
          placeholder="Peso Máximo de la raza"
          value={dog.weight_max}
          onChange={handleChange}
        />
      </label>
      
      <label className={style.create}>
        Height (min):
        <input
          type="text"
          name="height_min"
          placeholder="Altura Mínima de la raza"
          value={dog.height_min}
          onChange={handleChange}
        />
      </label>
      <label className={style.create}>
        Height (max):
        <input
          type="text"
          name="height_max"
          placeholder="Altura Máxima de la raza"
          value={dog.height_max}
          onChange={handleChange}
        />
      </label>
      
      <label className={style.create}>
        Lifespan (min):
        <input
          type="text"
          name="life_span_min"
          placeholder="Esperanza de Vida Mínima"
          value={dog.life_span_min}
          onChange={handleChange}
        />
      </label>
      <label className={style.create}>
        Lifespan (max):
        <input
          type="text"
          name="life_span_max"
          placeholder="Esperanza de vida Máxima"
          value={dog.life_span_max}
          onChange={handleChange}
        />
      </label>
      <label className={style.create}>
        Image (URL):
        <input
          type="text"
          name="image"
          placeholder="URL of Image"
          value={dog.image}
          onChange={handleChange}
        />
      </label>
      <label className={style.create}>
        Temperament:
        <input
          type="text"
          name="temperament"
          placeholder="Temperamento de la Raza"
          value={dog.temperament}
          onChange={handleChange}
        />
      </label>
      <button className={style.button} type="submit">Create Dog</button>
    </form>
    </div>
  );
};


// return (
//   //     <form onSubmit={handleSubmit}>
//   //       <input placeholder="Nombre de la Raza" type="text" name="name" onChange={handleChange} />
//   //       <input placeholder="altura min" type="text" name="weight_min" onChange={handleChange} />
//   //       <input placeholder="altura max" type="text" name="weight_max" onChange={handleChange} />
//   //       <input placeholder="peso min" type="text" name="height_min" onChange={handleChange} />
//   //       <input placeholder="peso max" type="text" name="height_max" onChange={handleChange} />
//   //       <input placeholder="vida min" type="text" name="life_span_min" onChange={handleChange} />
//   //       <input placeholder="vida max" type="text" name="life_span_max" onChange={handleChange} />
//   //       <input placeholder="imagen" type="text" name="image" onChange={handleChange} />
//   //       <input placeholder="temperament" type="text" name="temperament" onChange={handleChange} />
        
//   //       <button type="submit">Submit</button>
//   //     </form> ) };
