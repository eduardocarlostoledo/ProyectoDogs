import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import Card from '../Card/Card';
import NavBar from '../NavBar/NavBar';
import Pagination from '../Pagination/Pagination';
import {getDogs,getTemperaments} from '../../actions';

export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector(state => state.dogsView);
    useEffect(() => {
        dispatch(getDogs());
        setCurrentPage(1);
        dispatch(getTemperaments());},[dispatch]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [update, setUpdate] = useState(0);
    const [cardsPerPage] = useState(8);
    const lastIndex = currentPage*cardsPerPage;
    const firstIndex = lastIndex - cardsPerPage;
    const currentDogs = allDogs.slice(firstIndex,lastIndex);

    function pagination (pageNumber) {
        setCurrentPage(pageNumber);
        setUpdate(update => update+1);
    }
    //<Pagination cardsPerPage={cardsPerPage} allDogs={allDogs} pagination={pagination} activePage={currentPage}/>

    return (
        <div>                        
            <div >
                {currentDogs?.map(dog => <Card key={dog.id}
                                            id={dog.id}
                                            name={dog.name}
                                            image={dog.image}
                                            temperament={dog.temperament}
                                            weight={dog.weight}/>)}
            </div>            
        </div>
    );
}


// import React, { useEffect } from 'react';
// import { connect } from 'react-redux';
// import { getDogs } from "../../actions"

// const Home = ({ dogs, getDogs }) => {
//   useEffect(() => {
//     getDogs('http://localhost:3001/dogs');
//   }, [getDogs]);

//   return (
//     <div>
//       <h1>All Dogs</h1>
//       {dogs.map((dog) => (
//         <div key={dog.id}>
//           <h2>{dog.name}</h2>
//           <p>Weight: {dog.weight}</p>
//           <p>Height: {dog.height}</p>
//           <p>Lifespan: {dog.lifespan}</p>
//           <p>Temperaments: {dog.temperament}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   dogs: state.dogs,
// });

// const mapDispatchToProps = { getDogs };

// export default connect(mapStateToProps, mapDispatchToProps)(Home);