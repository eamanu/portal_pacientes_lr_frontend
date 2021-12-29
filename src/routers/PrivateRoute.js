import { Route } from "react-router-dom";
import {
  Redirect,
  useLocation,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ component: Component, ...res }) {
  const auth = useAuth();
  const location = useLocation();

  return (
    <Route {...res}>
      {auth.isLogged() ?  (
        <Component />
      ) : (
        <Redirect to={{ pathname: "/login", state: {from: location}}} />
      )}
   
    </Route>
  );
}
