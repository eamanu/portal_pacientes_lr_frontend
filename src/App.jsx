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
import GrupoFamiliar from './pages/GrupoFamiliar';
import HistoriaClinicaDigital from './pages/HistoriaClinicaDigital';
import ProgramaSumar from './pages/ProgramaSumar';
import CalendarioVacunacion from './pages/CalendarioVacunacion';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Router>

        <Link className="me-2" to="/inicio-de-sesion">Iniciar Sesión</Link>
        <Link className="me-2" to="/rigistro">Registrarse</Link>

        <Routes>
          <Route path="/inicio-de-sesion" exact element={<Login />} />
          <Route path="/rigistro" element={<Register />} />
          <Route path="/" element={<Main />} />
          <Route path="/grupo-familiar" exact element={<GrupoFamiliar />} />
          <Route path="/hc-digital" element={<HistoriaClinicaDigital />} />
          <Route path="/programa-sumar" element={<ProgramaSumar />} />
          <Route path="/calendario-de-vacunacion" element={<CalendarioVacunacion />} />
        </Routes>

        <Footer />
      </Router>

    </div>
  );
}

export default App;
