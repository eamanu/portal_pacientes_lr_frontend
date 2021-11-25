import React from 'react';
import './styles/App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import FamilyGroup from './pages/FamilyGroup';
import DigitalHC from './pages/DigitalHC';
import Program from './pages/Program';
import Calendar from './pages/Calendar';



function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>

        <Link className="me-2" to="/">Iniciar Sesión</Link>
        <Link className="me-2" to="/register">Registrarse</Link>
        <Link className="me-2" to="/main">Ingresar</Link>

        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/grupo-familiar" exact element={<FamilyGroup />} />
          <Route path="/hc-digital" element={<DigitalHC />} />
          <Route path="/programa-sumar" element={<Program />} />
          <Route path="/calendario-de-vacunacion" element={<Calendar />} />
        </Routes>

        <Footer />
      </Router>

    </div>
  );
}

export default App;
