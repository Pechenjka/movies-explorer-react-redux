import { Route, Switch, useHistory, useLocation } from "react-router";
import { useEffect, useState } from "react";
import "./App.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import moviesApi from "../../utils/MoviesApi";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [movies, setMovies] = useState([]);
  const [showMovies, setShowMovies] = useState([]);
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isSavedMovie, setIsSavedMovie] = useState([]);
  const [isNotFoundSearch, setIsNotFoundSearch] = useState(false);
  const [filterMovies, setFilterMovies] = useState([]);

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      tokenCheck();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (loggedIn) {
      getMovies();
      handleGetSavedMovies();
    }
  }, [loggedIn]);

  //Сохранение массива фильмов из внешнего API в локальное хранилище
  const getMovies = () => {
    setIsLoading(true);
    moviesApi
      .searchFilms()
      .then((res) => {
        return res.map((item) => {
          return {
            country: item.country || "",
            director: item.director || "",
            duration: item.duration || "",
            year: item.year || "",
            description: item.description || "",
            image: !item.image ? "" : `https://api.nomoreparties.co${item.image.url}`,
            trailer: item.trailerLink,
            thumbnail: !item.image ? "" : `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`,
            movieId: item.id || "",
            nameRU: item.nameRU || "",
            nameEN: item.nameEN || "",
          };
        });
      })
      .then((res) => {
        if (res) {
          localStorage.setItem("storageMovies", JSON.stringify(res));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  // Поиск фильмов по ключевым словам в локальном хранилище
  const handleSearchByWord = (word) => {
    const storageMovies = JSON.parse(localStorage.getItem("storageMovies"));
    const searchByWords = storageMovies.filter((item) => {
      if (isShortMovies) {
        return item.duration <= 40 && item.nameRU.toLowerCase().includes(word);
      }
      return item.nameRU.toLowerCase().includes(word);
    });
    setMovies(searchByWords);
    handleSearchFilms(searchByWords);
    setIsNotFoundSearch(true);
  };

  // Поиск фильмов по ключевым словам в сохраненных фильмов
  const handleSearchByWordSaved = (word) => {
    const searchByWords = isSavedMovie.filter((item) => {
      if (isShortMovies) {
        return item.duration <= 40 && item.nameRU.toLowerCase().includes(word);
      }
      return item.nameRU.toLowerCase().includes(word);
    });
    setFilterMovies(searchByWords);
    handleSearchFilms(searchByWords);
    setIsNotFoundSearch(true);
  };

  //В зависимости от разрешения показывать разное кол-во фильмов
  const handleSearchFilms = (searchByWords) => {
    const handleShowMoviesWindowWidth = () => {
      if (window.innerWidth >= 1280) {
        const showMovieMaxWidth = searchByWords.slice(0, 12);
        return showMovieMaxWidth;
      }
      if (window.innerWidth >= 768) {
        const showMovieMedWidth = searchByWords.slice(0, 8);
        return showMovieMedWidth;
      }
      if (window.innerWidth >= 320) {
        const showMovieMinWidth = searchByWords.slice(0, 5);
        return showMovieMinWidth;
      }
    };
    setShowMovies(handleShowMoviesWindowWidth);
  };

  //Отображение сохраненных фильмов
  const handleGetSavedMovies = () => {
    mainApi
      .getSavedMovies()
      .then((res) => {
        if (res) {
          setIsSavedMovie(res);
        }
      })
      .catch((err) => console.log(err));
  };

  //Функция сохранения и удаления фильмов
  function handleLikeClick(data) {
    if (
      isSavedMovie &&
      isSavedMovie.find((item) => {
        return item.movieId === data.movieId;
      })
    ) {
      if (!data._id) {
        data = isSavedMovie.find((item) => {
          return item.movieId === data.movieId;
        });
      }
      if (data._id) {
        return mainApi
          .deleteSavedMovie(data._id)
          .then((res) => {
            if (res) {
              const isDeletedMovie = isSavedMovie.filter((item) => item.movieId !== data.movieId);
              setIsSavedMovie(isDeletedMovie);
              setFilterMovies(isDeletedMovie);
              setIsNotFoundSearch(false);
            }
          })
          .catch((err) => console.log(err));
      }
    } else {
      return mainApi
        .savedMovies(data)
        .then((newMovie) => {
          if (newMovie) {
            setIsSavedMovie([...isSavedMovie, newMovie]);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  //Регистрация пользователя
  const handleRegister = (values) => {
    const { name, email, password } = values;
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          throw new Error({ message: "Не передано одно из полей" });
        }
        if (res) {
          handleLogin(values);
        }
      })
      .catch((err) => {
        if (err) {
          handleErrorSubmit();
          console.log({ message: "Некорректно заполнено одно из полей" });
        }
      });
  };
  //Авторизация пользователя
  const handleLogin = (values) => {
    const { email, password } = values;
    mainApi
      .authorization(email, password)
      .then((res) => {
        if (!res) {
          throw new Error({ message: "Не передано одно из полей" });
        }
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          handleGetUserInfo();
          setLoggedIn(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        if (err) {
          handleErrorSubmit();
          console.log({ message: "Необходимо пройти регистрацию" });
        }
      });
  };

  const tokenCheck = () => {
    mainApi.getContent().then((res) => {
      if (res) {
        handleGetUserInfo();
        setLoggedIn(true);
        if (pathname === "/signup" || pathname === "/signin") {
          return history.push("/");
        }
        history.push(`${pathname}`);
      }
    });
  };
  //Получения данных текущего пользователя
  const handleGetUserInfo = () => {
    mainApi
      .getUserInfo()
      .then((res) => setCurrentUser(res))
      .catch(() => console.log("Пользователь не найден"));
  };
  //Фукнция выхода из аккаунта
  const handleSignOut = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      localStorage.removeItem("jwt");
      setLoggedIn(false);
    }
  };
  //Обновление данных пользователя
  const handleUpdateUser = (values) => {
    const { email, name } = values;
    mainApi
      .setUserInfo(email, name)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        if (err) {
          handleErrorSubmit();
          console.log({ message: "При обновлении профиля произошла ошибка" });
        }
      });
  };

  const handleErrorSubmit = () => {
    setErrorSubmit(true);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute
            exact
            path="/movies"
            component={Movies}
            loggedIn={loggedIn}
            isLoading={isLoading}
            movies={movies}
            onSearchFilms={handleSearchByWord}
            showMovies={showMovies}
            setIsShortMovies={setIsShortMovies}
            isShortMovies={isShortMovies}
            setShowMovies={setShowMovies}
            handleLikeClick={handleLikeClick}
            isSavedMovie={isSavedMovie}
            isNotFoundSearch={isNotFoundSearch}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            component={SavedMovies}
            onSearchFilms={handleSearchByWordSaved}
            loggedIn={loggedIn}
            isSavedMovie={isSavedMovie}
            handleLikeClick={handleLikeClick}
            isNotFoundSearch={isNotFoundSearch}
            isShortMovies={isShortMovies}
            setIsShortMovies={setIsShortMovies}
            setFilterMovies={setFilterMovies}
            filterMovies={filterMovies}
          />
          <ProtectedRoute
            exact
            path="/profile"
            component={Profile}
            loggedIn={loggedIn}
            onSignOut={handleSignOut}
            onUpdateUser={handleUpdateUser}
            errorSubmit={errorSubmit}
          />
          <Route exact path="/signup">
            <Register onRegister={handleRegister} errorSubmit={errorSubmit} setErrorSubmit={setErrorSubmit} />
          </Route>
          <Route exact path="/signin">
            <Login onLogin={handleLogin} errorSubmit={errorSubmit} setErrorSubmit={setErrorSubmit} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
