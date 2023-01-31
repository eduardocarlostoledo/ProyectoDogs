import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDog } from './actions';
import NavBar from './NavBar';
import { Route, Link } from 'react-router-dom';

function Create() {
  const [dogForm, setDogForm] = useState({
    name: '',
    weight: '',
    height: '',
    lifeExpectancy: '',
    temperament: ''
  });

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createDog(dogForm));
    setDogForm({
      name: '',
      weight: '',
      height: '',
      lifeExpectancy: '',
      temperament: ''
    });
  };

  const handleChange = e => {
    setDogForm({
      ...dogForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={dogForm.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={dogForm.weight}
          onChange={handleChange}
        />
        <input
          type="number"
          name="height"
          placeholder="Height"
          value={dogForm.height}
          onChange={handleChange}
        />
        <input
          type="number"
          name="lifeExpectancy"
          placeholder="Life Expectancy"
          value={dogForm.lifeExpectancy}
          onChange={handleChange}
        />
        <input
          type="text"
          name="temperament"
          placeholder="Temperament"
          value={dogForm.temperament}
          onChange={handleChange}
        />
        <button type="submit">Create Dog</button>
      </form>
    </div>
  );
}

function Home() {
  const [filters, setFilters] = useState({
    name: '',
    temperament: '',
    weight: ''
  });

  const handleFilterChange = e => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <NavBar
        filters={filters}
        handleFilterChange={handleFilterChange}
      />
      <Route exact path="/" component={Home} />
      <Route path="/create" component={Create} />
      <Route path="/detail/:id" component={Detail} />
    </div>
  );
}

function Detail(props) {
  const dogId = props.match.params.id;
  const [dog, setDog] = useState(null);

  useEffect(() => {
    fetch(`localhost:3001/dogs/${dogId}`)
    .then(res => res.json())
    .then(dog => setDog(dog));
    }, [dogId]);
    
    return (
        <div>
        <NavBar />
            {dog ? (
                <div>
                    <h2>{dog.name}</h2>
                    <p>Weight: {dog.weight}</p>
                    <p>Height: {dog.height}</p>
                    <p>Life Expectancy: {dog.lifeExpectancy}</p>
                    <p>Temperament: {dog.temperament}</p>
                </div>
            ) : (
            <p>Loading...</p>
            )}
        </div>
        );
    }
    
    function App() {
    return (
    <div>
    <NavBar />
    <Route exact path="/" component={LandingPage} />
    <Route path="/home" component={Home} />
    <Route path="/create" component={Create} />
    <Route path="/detail/:id" component={Detail} />
    </div>
    );
    }
    
    export default App;
