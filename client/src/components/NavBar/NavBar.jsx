
import style from "./NavBar.module.css"
import {Link} from 'react-router-dom';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../actions/index";


export default function NavBar () {
    const dispatch = useDispatch();
    const [dog, setDog] = useState("");   
    
    const handleChange = (e) => {       
        setDog(e.target.value);
        // setDog({ ...dog,
        //         [e.target.name] : e.target.value });
      };  
    
      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getDogsByName(dog));
        
      };
      console.log("SUBMIT SEARCH", (dog) );
//      navigate("/Home");

    return (
        <div className={style.nav}>
            <Link to ="/" className={style.link}> Home </Link>
            <Link to ="/create" className={style.link}> Create </   Link>
            <form onSubmit={handleSubmit} className={style.submit}>
            <button>Buscar</button>
    
            <input
              className={style.search}
              placeholder="Search a gif here..."
              onChange={handleChange}
              type="text"
              name = "name"
            />        
            </form>
        </div>
      )
}

/*
copia de nav no funciona pero no da errores

import style from "./NavBar.module.css"
import {Link, Navigate, useNavigate} from 'react-router-dom';
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getDogsByName } from "../../actions/index";


export default function NavBar () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dog, setDog] = useState("");   
    
    const handleChange = useCallback((e) => {
        setDog({ ...dog, [e.target.name]: e.target.value });
      }, [dog]);  
    
      const handleSubmit = useCallback((e) => {
        e.preventDefault();
        dispatch(getDogsByName(dog));
      }, [dog, dispatch]);
      console.log("SUBMIT SEARCH", ([dog]) );
      navigate("/Home");

    return (
        <div className={style.nav}>
            <Link to ="/" className={style.link}> Home </Link>
            <Link to ="/create" className={style.link}> Create </Link>
            <input 
                    name="name"                                        
                    type="text" 
                    placeholder="Search..." 
                    onChange={handleChange}
                />
                <button 
                    className={style.button} 
                    type="submit" 
                    onClick={handleSubmit}> Search 
                </button>
        </div>
    )
}

este tampoco funciona 

import { useLocation } from "wouter" // npm install wouter
import useForm from './hook'
import style from "./NavBar.module.css"
import {Link, Navigate, useNavigate} from 'react-router-dom';
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { getDogs, getDogsByName } from "../../actions/index";

export default function NavBar({initialKeyword = ''}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();    
    const [location, pushLocation] = useLocation() //q guarde la navegacion
    const {keyword, changeKeyword} = useForm({ initialKeyword }) // que vaya guardando el keyword para hacer rank luego.

  const onSubmit = ({ keyword }) => {
    if (keyword !== '') {
    dispatch(getDogsByName(keyword));
    console.log("SUBMIT SEARCH", (keyword));    
    } else {
    dispatch(getDogs());
  }  
  const handleChange = (event) => {
    changeKeyword({ keyword: event.target.value })
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ keyword })
  }  

  return (
    <div className={style.nav}>
        <Link to ="/" className={style.link}> Home </Link>
        <Link to ="/create" className={style.link}> Create </   Link>
        <form onSubmit={handleSubmit} className={style.submit}>
        <button>Buscar</button>

        <input
          className={style.search}
          placeholder="Search a gif here..."
          onChange={handleChange}
          type="text"
          value={keyword}
        />        
        </form>
    </div>
  )
}
}
    
        */