import { Switch, Route, Redirect } from 'react-router-dom';
import Alergias from './pages/Alergias';
import AntecedentesFamiliares from './pages/AntecedentesFamiliares';
import AntecedentesPersonales from './pages/AntecedentesPersonales';
import SignosVitales from './pages/SignosVitales';
import DatosAntropometricos from './pages/DatosAntropometricos';
import DatosCronicos from './pages/DatosCronicos';
import Hospitalizacion from './pages/Hospitalizacion';
import Inmunizacion from './pages/Inmunizacion';
import Medicacion from './pages/Medicacion';
import ProblemasActivos from './pages/ProblemasActivos';
import RegistrosDentales from './pages/RegistrosDentales';
import NotFound from '../NotFound';

export default function HCDRouter() {
    return (
             <Switch>
                <Route path='/usuario/historia-clinica/signos-vitales' component={SignosVitales}/>
                <Route path='/usuario/historia-clinica/alergias' component={Alergias}/>
                <Route path='/usuario/historia-clinica/antecedentes-familiares' component={AntecedentesFamiliares}/>
                <Route path='/usuario/historia-clinica/antecedentes-personales' component={AntecedentesPersonales}/>
                <Route path='/usuario/historia-clinica/datos-antropometricos' component={DatosAntropometricos }/>
                <Route path='/usuario/historia-clinica/datos-cronicos' component={DatosCronicos }/>
                <Route path='/usuario/historia-clinica/hospitalizacion' component={Hospitalizacion }/>
                <Route path='/usuario/historia-clinica/inmunizacion' component={Inmunizacion }/>
                <Route path='/usuario/historia-clinica/medicacion' component={Medicacion }/>
                <Route path='/usuario/historia-clinica/problemas-activos' component={ProblemasActivos }/>
                <Route path='/usuario/historia-clinica/registros-dentales' component={RegistrosDentales }/>
                <Route path='/usuario/historia-clinica/404' component={NotFound}/>   
                <Route path='/usuario/historia-clinica/*'><Redirect to='/usuario/404'/></Route> 
            </Switch>
    )
}
