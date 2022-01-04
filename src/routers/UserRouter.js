import { Switch, Route } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
import UserHeader from '../components/UserHeader';
import CalendarioVacunacion from '../pages/CalendarioVacunacion';
import GrupoFamiliar from '../pages/GrupoFamiliar';
import HistoriaClinicaDigital from '../pages/HistoriaClinicaDigital';
import Instituciones from '../pages/Instituciones';
import ProgramaSumar from '../pages/ProgramaSumar';
import PatientProvider from '../contexts/PatientProvider';
import Main from '../pages/Main/Main';

export default function UserRouter() {

    return (
        <div className='user-container'>
        <PatientProvider>
        <UserHeader/>
            <Switch>
                <Route exact path='/usuario' component={Main}/>
                <Route path='/usuario/grupo-familiar' component={GrupoFamiliar}/>
                <Route path='/usuario/historia-clinica' component={HistoriaClinicaDigital}/>
                <Route path='/usuario/programa-sumar' component={ProgramaSumar}/>
                <Route path='/usuario/calendario-vacunacion' component={CalendarioVacunacion}/>    
                <Route path='/usuario/instituciones' component={Instituciones}/>    
            </Switch>
        </PatientProvider>
        </div>
    )
}
