import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
import { handleGetUserInfo, isLoggedInFalse, isLoggedInTrue } from "../../redux/Actions/userActions";
import { getMovies, handleGetSavedMovies } from "../../redux/Actions/moviesActions";

const App = () => {
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

  //Получение массива фильмов и отображение сохраненных фильмов
  useEffect(() => {
    if (loggedIn) {
      dispatch(getMovies());
      dispatch(handleGetSavedMovies());
    }
  }, [dispatch, loggedIn]);

  //Проверка токена пользователя при посещении сайта
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
        <ProtectedRoute exact path="/movies" component={Movies} loggedIn={loggedIn} />
        <ProtectedRoute exact path="/saved-movies" component={SavedMovies} loggedIn={loggedIn} />
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
