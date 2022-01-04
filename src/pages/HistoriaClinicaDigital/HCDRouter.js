import { Switch, Route } from 'react-router-dom';
import Estudios from './components/Estudios/Estudios';
import Prestaciones from './components/Prestaciones';
import SignosVitales from './components/SignosVitales';

export default function HCDRouter() {
    return (
             <Switch>
                <Route path='/usuario/historia-clinica/signos-vitales' component={SignosVitales}/>
                <Route path='/usuario/historia-clinica/estudios' component={Estudios}/>
                <Route path='/usuario/historia-clinica/prestaciones' component={Prestaciones}/>
            </Switch>
    )
}
