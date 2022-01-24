import { Switch, Route, Redirect } from 'react-router-dom';
import Historial from './pages/Historial';
import MisTurnos from './pages/MisTurnos';
import ReservarTurnos from './pages/ReservarTurnos';
import NotFound from '../NotFound';

export default function TurnosRouter() {
    return (
             <Switch>
                <Route exact path='/usuario/turnos' component={MisTurnos}/>
                <Route path='/usuario/turnos/reservar-turnos' component={ReservarTurnos}/>
                <Route path='/usuario/turnos/historial' component={Historial}/>
                <Route path='/usuario/turnos/404' component={NotFound}/>   
                <Route path='/usuario/turnos/*'><Redirect to='/usuario/404'/></Route>
            </Switch>
    )
}