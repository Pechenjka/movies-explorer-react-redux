import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...props }) => {
  //const loggedIn = useSelector((state) => state.user.isLoggedIn);

  return <Route>{props.loggedIn === true ? <Component {...props} /> : <Redirect to="/" />}</Route>;
};

export default ProtectedRoute;
