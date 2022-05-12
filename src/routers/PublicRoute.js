import { Route } from "react-router-dom";
import {
  Redirect,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PublicRoute({ component: Component, ...res }) {
  const auth = useAuth();

  return (
    <Route {...res}>
      {!auth.isLogged() ?  (
        <Component />
      ) : (
        <Redirect to="/" />
      )}
   
    </Route>
  );
}
