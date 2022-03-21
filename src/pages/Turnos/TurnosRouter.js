import { Switch, Route, Redirect } from 'react-router-dom';
import MisTurnos from './pages/MisTurnos';
import ReservarTurnos from './pages/ReservarTurnos';
import NotFound from '../NotFound';

export default function TurnosRouter() {
    return (
             <Switch>
                <Route exact path='/usuario/turnos/mis-turnos' component={MisTurnos}/>
                <Route exact path='/usuario/turnos/reservar-turnos' component={ReservarTurnos}/>
                <Route path='/usuario/turnos/404' component={NotFound}/>   
                <Route path='/usuario/turnos/*'><Redirect to='/usuario/404'/></Route>
            </Switch>
    )
}