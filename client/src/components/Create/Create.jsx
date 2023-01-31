import React, { useState, useCallback } from "react";
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
    temperaments: ''
  });

  const dispatch = useDispatch();

  const handleChange = useCallback((e) => {
    setDog({ ...dog, [e.target.name]: e.target.value });
  },[dog]);  
//implemento console group para no tener cada cambio en consola del form
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.group("handlesubmit");
    dispatch(postDog(dog));
    console.groupEnd();
  }, [dog, dispatch]);

  // const handleSubmit = useCallback((e) => {
  //   e.preventDefault();
  //   dispatch(postDog(dog));
  // }, [dog, dispatch]);
  // console.log("handlesubmitOK",dog);

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
          name="lifespan_min"
          placeholder="Esperanza de Vida Mínima"
          value={dog.lifespan_min}
          onChange={handleChange}
        />
      </label>
      <label className={style.create}>
        Lifespan (max):
        <input
          type="text"
          name="lifespan_max"
          placeholder="Esperanza de vida Máxima"
          value={dog.lifespan_max}
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
        Temperaments:
        <input
          type="text"
          name="temperaments"
          placeholder="Temperamentos de la Raza"
          value={dog.temperaments}
          onChange={handleChange}
        />
      </label>
      <button className={style.button} type="submit">Create Dog</button>
    </form>
    </div>
  );
};

// import React from "react";
// import {useDispatch} from "react-redux";
// import * as actions from "../../actions/index.js";
// //import {postDog} from "../../actions";
// import style from "./CreateDog.module.css";
// //import { useNavigate } from "react-router-dom";

// export default function Create() {
//   const [dog, setInput] = React.useState({
//     name: '',
//     weight_min: '',
//     weight_max: '',
//     height_min: '',
//     height_max: '',
//     lifespan_min: '',
//     lifespan_max: '',
//     temperaments: ''
//   })

//   const handleChange = (e) =>{
//     setInput({...dog,
//     [e.target.name] : e.target.value})    
//   };

//   const dispatch=useDispatch();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(actions.postDog(dog))
//   }
  
/*
// {
//   "name": "Tocino",
//   "weight_min": "1",
//   "weight_max": "5",
//   "height_min": "10",
//   "height_max": "20",
//   "life_span_min": "5",
//   "life_span_max": "10",
//   "temperaments": "Divertido",
// 	"image": "coso"
// }

----
  const [dog, setDog] = useState({
    name: '',
    weight_min: '',
    weight_max: '',
    height_min: '',
    height_max: '',
    lifespan_min: '',
    lifespan_max: '',
    temperaments: ''
  });
  const dispatch = useDispatch()
  const navigate = useNavigate();  
  
  const handleSubmit = (e) => {
        e.preventDefault();
        const {name, weight, height, lifespan, temperaments} =  dog;
        dispatch(postDog({name, weight, height, lifespan, temperaments}));
        alert('¡New breed added to the database!');
        navigate("/home");         
    }
    const handleChange = (e) => {
        setDog({ ...dog, [e.target.name]: e.target.value });
      }; 
      -----
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {postDog} from "../../actions";
import NavBar from "../NavBar/NavBar";

export default function Create() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input, setInput] = useState ({
        name: '',
        weight_min: '',
        weight_max: '',
        weight: '',
        height_min: '',
        height_max: '',
        height: '',
        lifespan_min: '',
        lifespan_max: '',
        lifespan: '',
        temperaments: '',
    });
        
    const [update, setUpdate] = useState(0);
 
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.id]: e.target.value
        })
    }
   
    function handleSubmit (e) {
        e.preventDefault();
        const {name, weight, height, lifespan, temperaments} =  input;
        dispatch(postDog({name, weight, height, lifespan, temperaments}));
        alert('¡New breed added to the database!');
        navigate("/home");

import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {postDog} from "../../actions";
import style from "./CreateDog.module.css";


const CreateDog = ({ postDog }) => {
  const [dog, setDog] = useState({
    name: '',
    weight_min: '',
    weight_max: '',
    height_min: '',
    height_max: '',
    lifespan_min: '',
    lifespan_max: '',
    temperaments: ''
  });

  const handleChange = e => {
    setDog({ ...dog, [e.target.name]: e.target.value });
  };
  
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    postDog("/dog", dog);
    navigate("/home");
  };

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
          name="lifespan_min"
          placeholder="Esperanza de Vida Mínima"
          value={dog.lifespan_min}
          onChange={handleChange}
        />
      </label>
      <label className={style.create}>
        Lifespan (max):
        <input
          type="text"
          name="lifespan_max"
          placeholder="Esperanza de vida Máxima"
          value={dog.lifespan_max}
          onChange={handleChange}
        />
      </label>
      
      <label className={style.create}>
        Temperaments:
        <input
          type="text"
          name="temperaments"
          placeholder="Temperamentos de la Raza"
          value={dog.temperaments}
          onChange={handleChange}
        />
      </label>
      <button className={style.button} type="submit">Create Dog</button>
    </form>
    </div>
  );
};
const mapDispatchToProps = { postDog };

export default connect(null, mapDispatchToProps)(CreateDog);

*/