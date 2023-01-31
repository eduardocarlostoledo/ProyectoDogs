import React from "react";
import {Link} from 'react-router-dom';

export default function Card({id,name, image, temperaments, weight}) {
    const temperamentList = temperaments.map(temperament => <button key={temperament}>{temperament}</button>);
    return (
        <Link to={`/detail/${id}`} style={{textDecoration: 'none'}}>
            <div >
                <div >
                    <div >
                        <img src={image || './NOPHOTO.jpg'} alt={name} />
                        <h1>{name}</h1>
                    </div>
                    <div >
                        <h1>{name}</h1>
                        <h2>Weight: {weight}</h2>
                        <h2>Temperaments:</h2>
                        {temperamentList}
                    </div>
                </div>
            </div>
        </Link>
    );
}