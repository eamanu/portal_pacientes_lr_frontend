import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom/cjs/react-router-dom.min"
import PrivateRoute from "./PrivateRoute"
import PublicRoute from "./PublicRoute"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Login from "../pages/Login"
import Register from "../pages/Register"
import UserRouter from "./UserRouter"
import NotFound from "../pages/NotFound/NotFound"

export default function AppRouter() {
    return (
        <Router>
            <Header />
            <Switch>
                <PublicRoute exact path='/login' component={Login}/>
                <PublicRoute exact path='/register' component={Register}/>
                <PrivateRoute path='/usuario' component={UserRouter}/>   
                <PrivateRoute path='/'><Redirect to="/usuario"/> </PrivateRoute>  
                <Route path='/404' component={NotFound}/>   
                <Route path='*' component={NotFound}/>   
            </Switch>
            <Footer />
        </Router>
    )
}
