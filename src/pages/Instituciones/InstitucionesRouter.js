import { Switch, Route } from 'react-router-dom';
import CentrosMedicos from './pages/CentrosMedicos';
import Guardias from './pages/Guardias';
import Telefonos from './pages/Telefonos';

export default function InstitucionesRouter() {
    return (
             <Switch>
                <Route path='/usuario/instituciones/centros-medicos' component={CentrosMedicos}/>
                <Route path='/usuario/instituciones/guardias' component={Guardias}/>
                <Route path='/usuario/instituciones/telefonos' component={Telefonos}/>
            </Switch>
    )
}