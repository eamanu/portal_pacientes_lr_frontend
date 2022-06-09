import { useEffect, useState } from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom/cjs/react-router-dom.min"
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginPerson from "../pages/LoginPerson";
import Login from "../admin-pages/Login";
import Register from "../pages/Register";
import UserRouter from "./UserRouter";
import NotFound from "../pages/NotFound/NotFound";
import AvisoVerificacion from "../pages/AvisoVerificacion";
import RecuperarContraseña from "../pages/RecuperarContraseña";
import AdminRouter from "./AdminRouter";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

export default function AppRouter() {
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const path = auth.typeUser === 1 ? '/admin' : '/usuario'
    const component = auth.typeUser === 1 ? AdminRouter : UserRouter

    useEffect(() => {
        setLoading(false)
    }, [auth])
    

    return (
        <>
        {loading ? 
         <Loader isActive={loading}></Loader>  
        : <Router>
            <Header />
            <div className="main-container">
            <Switch>
                <PublicRoute exact path='/login' component={LoginPerson }/>
                <PublicRoute exact path='/login-admin' component={Login}/>
                <PublicRoute exact path='/register' component={Register}/>
                <PublicRoute exact path='/verificacion' component={AvisoVerificacion}/>
                <PublicRoute exact path='/verificacion/*' component={AvisoVerificacion}/>
                <PublicRoute exact path='/recuperar-clave' component={RecuperarContraseña}/>
                <PublicRoute exact path='/recuperar-clave/*' component={RecuperarContraseña}/>
                <PrivateRoute path={path} component={ component } />
                <Route exact path='/'><Redirect to={path}/></Route>  
                <Route path='/404' component={NotFound}/>   
                <Route path='*'><Redirect to='/404'/></Route>    
            </Switch>
            <Footer />
            </div>
        </Router>  
        }
        </>

    )
}
