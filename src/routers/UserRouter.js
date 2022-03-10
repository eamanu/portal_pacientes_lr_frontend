import { Switch, Route, Redirect } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
import UserHeader from '../components/UserHeader';
import CalendarioVacunacion from '../pages/CalendarioVacunacion';
import GrupoFamiliar from '../pages/GrupoFamiliar';
import HistoriaClinicaDigital from '../pages/HistoriaClinicaDigital';
import Instituciones from '../pages/Instituciones';
import ProgramaSumar from '../pages/ProgramaSumar';
import Notificaciones from '../pages/Notificaciones';
import PerfilPaciente from '../pages/PerfilPaciente';
import PatientProvider from '../contexts/PatientProvider';
import Main from '../pages/Main/Main';
import Turnos from '../pages/Turnos';
import Estudios from '../pages/Estudios';
import NotFound from '../pages/NotFound/NotFound';
import AgregarPaciente from '../pages/GrupoFamiliar/AgregarPaciente';

export default function UserRouter() {

    return (
        <div className='user-container'>
        <PatientProvider>
        <UserHeader/>
        <div className='patient-container'>
            <Switch>
                <Route exact path='/usuario' component={Main}/>
                <Route path='/usuario/grupo-familiar' component={GrupoFamiliar}/>
                <Route path='/usuario/agregar-paciente' component={AgregarPaciente}/>
                <Route path='/usuario/historia-clinica' component={HistoriaClinicaDigital}/>
                <Route path='/usuario/programa-sumar' component={ProgramaSumar}/>
                <Route path='/usuario/calendario-vacunacion' component={CalendarioVacunacion}/>    
                <Route path='/usuario/instituciones' component={Instituciones}/>
                <Route path='/usuario/perfil-paciente' component={PerfilPaciente}/>

                <Route path='/usuario/notificaciones' component={Notificaciones }/>    
                <Route path='/usuario/turnos' component={Turnos}/>    
                <Route path='/usuario/estudios' component={Estudios}/>
                <Route path='/usuario/404' component={NotFound}/>   
                <Route path='/usuario/*'><Redirect to='/usuario/404'/></Route>        
            </Switch>
        </div>
        </PatientProvider>
        </div>
    )
}
