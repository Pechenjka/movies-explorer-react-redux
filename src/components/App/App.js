import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGetUserInfo,
  isLoggedInFalse,
  isLoggedInTrue,
} from "../../redux/actions";
import { getMovies, handleGetSavedMovies } from "../../redux/Actions/moviesActions";

const App = () => {
  const [isNotFoundSearch, setIsNotFoundSearch] = useState(false);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      tokenCheck();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (loggedIn) {
      dispatch(getMovies());
      dispatch(handleGetSavedMovies());
    }
  }, [loggedIn]);


  const tokenCheck = () => {
    mainApi.getContent().then((res) => {
      if (res) {
        dispatch(handleGetUserInfo());
        dispatch(isLoggedInTrue());
        if (pathname === "/signup" || pathname === "/signin") {
          return history.push("/");
        }
        history.push(`${pathname}`);
      }
    });
  };

  //Фукнция выхода из аккаунта
  const handleSignOut = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      localStorage.removeItem("jwt");
      localStorage.removeItem("storageMovies");
      dispatch(isLoggedInFalse());
    }
  };

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <ProtectedRoute
          exact
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}
        />
        <ProtectedRoute
          exact
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
        />
        <ProtectedRoute exact path="/profile" component={Profile} loggedIn={loggedIn} onSignOut={handleSignOut} />
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
