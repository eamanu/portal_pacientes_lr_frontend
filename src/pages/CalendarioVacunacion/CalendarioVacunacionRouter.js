import { Switch, Route, Redirect } from 'react-router-dom';
import Historial from './pages/Historial';
import TurnoVacunacion from './pages/TurnoVacunacion';
import NotFound from '../NotFound';


export default function CalendarioVacunacionRouter() {
    return (
             <Switch>
                <Route exact path='/usuario/calendario-vacunacion/turno-vacunacion' component={TurnoVacunacion}/>
                <Route path='/usuario/calendario-vacunacion/historial' component={Historial}/>
                <Route path='/usuario/calendario-vacunacion/404' component={NotFound}/>   
                <Route path='/usuario/calendario-vacunacion/*'><Redirect to='/usuario/404'/></Route> 
            </Switch>
    )
}