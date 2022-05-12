import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from '../../pages/NotFound'
import CreatedMessages from './pages/CreatedMessages';
import ActiveMessages from './pages/ActiveMessages';

export default function AdminMessagesRouter() {
    return (
             <Switch>
                <Route exact path='/admin/mensajeria/mensajes-activos' component={ActiveMessages}/>
                <Route exact path='/admin/mensajeria/borradores' component={CreatedMessages}/>
                <Route path='/usuario/turnos/404' component={NotFound}/>   
                <Route path='/usuario/turnos/*'><Redirect to='/404'/></Route>
            </Switch>
    )
}