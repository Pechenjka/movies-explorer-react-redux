import {
  CURRENT_USER,
  HIDE_ERROR_SUBMIT,
  HIDE_ISLOADING,
  IS_LOGGED_IN_FALSE,
  IS_LOGGED_IN_TRUE,
  SHOW_ERROR_SUBMIT,
  SAVED_MOVIES,
  SHOW_ISLOADING,
  DELETED_MOVIES,
  MOVIES,
  SHOW_SEARCH_MOVIES,
  SHOW_SEARCH_SAVED_MOVIES,
  IS_SHORT_MOVIES_TRUE,
  IS_SHORT_MOVIES_FALSE,
  SHOW_IS_NOT_FOUND_SEARCH,
  HIDE_IS_NOT_FOUND_SEARCH,
} from "./types";

import mainApi from "../utils/MainApi";

const showIsLoading = () => {
  return {
    type: SHOW_ISLOADING,
  };
};
const hideIsLoading = () => {
  return {
    type: HIDE_ISLOADING,
  };
};

const isLoggedInTrue = () => {
  return {
    type: IS_LOGGED_IN_TRUE,
  };
};
const isLoggedInFalse = () => {
  return {
    type: IS_LOGGED_IN_FALSE,
  };
};
const showErrorSubmit = () => {
  return {
    type: SHOW_ERROR_SUBMIT,
  };
};
const hideErrorSubmit = () => {
  return {
    type: HIDE_ERROR_SUBMIT,
  };
};
const currentUser = (dataUser) => {
  return {
    type: CURRENT_USER,
    payload: dataUser,
  };
};

const savedMoviesAction = (dataMovie) => {
  return {
    type: SAVED_MOVIES,
    payload: dataMovie,
  };
};

const deletedMovies = (dataMovie) => {
  return {
    type: DELETED_MOVIES,
    payload: dataMovie,
  };
};

const moviesAction = (dataMovie) => {
  return {
    type: MOVIES,
    payload: dataMovie,
  };
};

const showMoviesAction = (dataMovies) => {
  return {
    type: SHOW_SEARCH_MOVIES,
    payload: dataMovies,
  };
};

const showSearchSavedMoviesAction = (dataMovies) => {
  return {
    type: SHOW_SEARCH_SAVED_MOVIES,
    payload: dataMovies,
  };
};

const isShortMoviesTrue = () => {
  return {
    type: IS_SHORT_MOVIES_TRUE,
  };
};

const isShortMoviesFalse = () => {
  return {
    type: IS_SHORT_MOVIES_FALSE,
  };
};

const showIsNotFoundSearch = () => {
  return {
    type: SHOW_IS_NOT_FOUND_SEARCH,
  };
};

const hideIsNotFoundSearch = () => {
  return {
    type: HIDE_IS_NOT_FOUND_SEARCH,
  };
};

//Регистрация пользователя
const handleRegister = (values, history) => {
  const { name, email, password } = values;
  return (dispatch) => {
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          throw new Error({ message: "Не передано одно из полей" });
        }
        if (res) {
          dispatch(handleLogin(values, history));
        }
      })
      .catch((err) => {
        if (err) {
          dispatch(handleErrorSubmit());
          console.log({ message: "Некорректно заполнено одно из полей" });
        }
      });
  };
};

//Авторизация пользователя
const handleLogin = (values, history) => {
  const { email, password } = values;
  return (dispatch) => {
    mainApi
      .authorization(email, password)
      .then((res) => {
        if (!res) {
          throw new Error({ message: "Не передано одно из полей" });
        }
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          dispatch(handleGetUserInfo());
          dispatch(isLoggedInTrue());
          history.push("/movies");
        }
      })
      .catch((err) => {
        if (err) {
          dispatch(handleErrorSubmit());
          console.log({ message: "Необходимо пройти регистрацию" });
        }
      });
  };
};

const handleGetUserInfo = () => {
  return (dispatch) => {
    mainApi
      .getUserInfo()
      .then((res) => dispatch(currentUser(res)))
      .catch(() => console.log("Пользователь не найден"));
  };
};

const handleErrorSubmit = () => {
  return (dispatch) => {
    dispatch(showErrorSubmit());
  };
};

const handleUpdateUser = (values) => {
  const { email, name } = values;
  return (dispatch) => {
    mainApi
      .setUserInfo(email, name)
      .then((res) => {
        dispatch(currentUser(res));
      })
      .catch((err) => {
        if (err) {
          dispatch(handleErrorSubmit());
          console.log({ message: "При обновлении профиля произошла ошибка" });
        }
      });
  };
};

export {
  savedMoviesAction,
  deletedMovies,
  showIsLoading,
  hideIsLoading,
  handleRegister,
  handleErrorSubmit,
  handleLogin,
  hideErrorSubmit,
  handleUpdateUser,
  currentUser,
  handleGetUserInfo,
  isLoggedInTrue,
  isLoggedInFalse,
  moviesAction,
  showMoviesAction,
  showSearchSavedMoviesAction,
  isShortMoviesTrue,
  isShortMoviesFalse,
  hideIsNotFoundSearch,
  showIsNotFoundSearch,
};
