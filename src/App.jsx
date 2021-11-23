import React from 'react';
import './styles/App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from './pages/Login/index';
import Register from './pages/Register';
import Main from './pages/Main';
import Footer from './pages/Main/Footer'


function App() {
  return (
    <div className="App">
        <h1>Portal del Paciente - La Rioja</h1>  
        <Router>

          <Link to="/">Iniciar Sesión</Link>
          <Link to="/register">Registrarse</Link>
          <Link to="/main">Ingresar</Link>
      
          <Routes>
            <Route path="/" exact element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/main" element={<Main/>}/>
          </Routes>
       
        <Footer/>
      </Router>
      
    </div>
  );
}

export default App;
