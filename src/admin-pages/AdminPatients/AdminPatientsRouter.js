import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../../pages/NotFound'
import PendingPatients from './pages/PendingPatients/PendingPatients';
import RejectPatients from './pages/RejectPatients/RejectPatients'

export default function AdminPatientsRouter() {
    return (
             <Switch>
                <Route exact path='/admin/alta-de-pacientes/pacientes-pendientes' component={PendingPatients}/>
                <Route exact path='/admin/alta-de-pacientes/pacientes-rechazados' component={RejectPatients}/>
                <Route path='/usuario/turnos/404' component={NotFound}/>   
                <Route path='/usuario/turnos/*'><Redirect to='/404'/></Route>
            </Switch>
    )
}