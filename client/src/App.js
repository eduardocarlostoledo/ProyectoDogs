
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './components/Landing/Landing.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Home from './components/Home/Home.jsx';
import Create from "./components/Create/Create"
import Detail from './components/Detail/Detail.jsx';
import React from 'react';


function App() {
  return (
    <BrowserRouter>
      <div >
        <NavBar  /> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
