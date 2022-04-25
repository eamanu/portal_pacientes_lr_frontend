import { Route } from "react-router-dom";
import {
  Redirect,
  useLocation,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ component: Component, ...res }) {
  const location = useLocation();
  const auth = useAuth();
  const path = auth.typeUser === 1 ? '/login-admin' : '/login'

  return (
    <Route {...res}>
      {auth.isLogged() ?  (
        <Component />
      ) : (
        <Redirect to={{ pathname: path, state: {from: location}}} />
      )}
   
    </Route>
  );
}
