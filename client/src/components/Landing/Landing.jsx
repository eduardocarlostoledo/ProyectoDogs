import React from 'react';
import {Link} from 'react-router-dom';
import style from "./Landing.module.css";

export default function LandingPage() { 

    return (
        <div className={style.div}>
            <h1 className={style.h1}>Bienvenido al Sitio de Perros</h1>
            <Link to='/home'>
                <button className={style.button}> GO! </button>
            </Link>
        </div>
    );
}