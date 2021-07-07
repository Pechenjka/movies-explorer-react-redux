import { hideIsLoading, showIsLoading } from "./appActions";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import {
  DELETED_MOVIES,
  HIDE_IS_NOT_FOUND_SEARCH,
  IS_SHORT_MOVIES_FALSE,
  IS_SHORT_MOVIES_TRUE,
  MOVIES,
  SAVED_MOVIES,
  SHOW_IS_NOT_FOUND_SEARCH,
  SHOW_SEARCH_MOVIES,
  SHOW_SEARCH_SAVED_MOVIES,
} from "../types";

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

//Сохранение массива фильмов из внешнего API в локальное хранилище
const getMovies = () => {
  return (dispatch) => {
    if (!localStorage.getItem("storageMovies")) {
      dispatch(showIsLoading());
      return moviesApi
        .searchFilms()
        .then((res) => {
          return res.map((item) => {
            console.log(item);
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
          localStorage.setItem("storageMovies", JSON.stringify(res));
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(hideIsLoading()));
    }
  };
};

//Функция сохранения и удаления фильмов
const handleLikeClick = (data, isSavedMovie) => {
  return (dispatch) => {
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
              dispatch(deletedMovies(res));
            }
          })
          .catch((err) => console.log(err));
      }
    } else {
      return mainApi
        .savedMovies(data)
        .then((newSaveMovie) => {
          if (newSaveMovie) {
            dispatch(savedMoviesAction(newSaveMovie));
          }
        })
        .catch((err) => console.log(err));
    }
  };
};

//Отображение сохраненных фильмов
const handleGetSavedMovies = () => {
  return (dispatch) => {
    return mainApi
      .getSavedMovies()
      .then((res) => {
        dispatch(savedMoviesAction(res));
      })
      .catch((err) => console.log(err));
  };
};

// Поиск фильмов по ключевым словам в локальном хранилище
const handleSearchByWord = (word, isShortMovies) => {
  return (dispatch) => {
    dispatch(showIsLoading());
    let getPromiseSearchMovies = new Promise((resolve, reject) => {
      const storageMovies = JSON.parse(localStorage.getItem("storageMovies"));
      resolve(
        storageMovies.filter((item) => {
          if (isShortMovies) {
            return item.duration <= 40 && item.nameRU.toLowerCase().includes(word.toLowerCase());
          }
          return item.nameRU.toLowerCase().includes(word.toLowerCase());
        })
      );
    });
    setTimeout(() => {
      getPromiseSearchMovies
        .then((searchByWords) => {
          dispatch(moviesAction(searchByWords));
          dispatch(showMoviesAction(handleSearchFilms(searchByWords)));
          dispatch(showIsNotFoundSearch());
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(hideIsLoading()));
    }, 1000);
  };
};

// Поиск фильмов по ключевым словам в сохраненных фильмах
const handleSearchByWordSaved = (word, isShortMovies, isSavedMovie) => {
  return (dispatch) => {
    dispatch(showIsLoading());
    let getPromiseSearchInSaveMovies = new Promise((resolve, reject) => {
      resolve(
        isSavedMovie.filter((item) => {
          if (isShortMovies) {
            return item.duration <= 40 && item.nameRU.toLowerCase().includes(word.toLowerCase());
          }
          return item.nameRU.toLowerCase().includes(word.toLowerCase());
        })
      );
    });
    setTimeout(() => {
      getPromiseSearchInSaveMovies
        .then((searchByWords) => {
          dispatch(showSearchSavedMoviesAction(handleSearchFilms(searchByWords)));
          dispatch(showIsNotFoundSearch());
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(hideIsLoading()));
    }, 1000);
  };
};

//В зависимости от разрешения показывать разное кол-во фильмов
const handleSearchFilms = (searchByWords) => {
  if (window.innerWidth >= 1280) {
    return searchByWords.slice(0, 12);
  }
  if (window.innerWidth >= 768) {
    return searchByWords.slice(0, 8);
  }
  if (window.innerWidth >= 320) {
    return searchByWords.slice(0, 5);
  }
};

export {
  getMovies,
  handleGetSavedMovies,
  handleLikeClick,
  handleSearchByWord,
  handleSearchByWordSaved,
  isShortMoviesTrue,
  isShortMoviesFalse,
  hideIsNotFoundSearch,
  savedMoviesAction,
  showSearchSavedMoviesAction,
  showMoviesAction,
};
