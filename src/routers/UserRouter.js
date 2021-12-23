import { Switch, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CalendarioVacunacion from '../pages/CalendarioVacunacion';
import GrupoFamiliar from '../pages/GrupoFamiliar';
import HistoriaClinicaDigital from '../pages/HistoriaClinicaDigital';
import ProgramaSumar from '../pages/ProgramaSumar';
export default function UserRouter() {
    return (
        <div className='d-flex'>
        <Sidebar />
        <h1>Nombre del paciente</h1>
        <Switch>
            <Route path='/usuario/grupo-familair' component={GrupoFamiliar}/>
            <Route path='/usuario/historia-clinica' component={HistoriaClinicaDigital}/>
            <Route path='/usuario/programa-sumar' component={ProgramaSumar}/>
            <Route path='/usuario/calendario-vacunacion' component={CalendarioVacunacion}/>    
        </Switch>
        </div>
    )
}