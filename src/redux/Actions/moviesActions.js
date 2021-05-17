import {
  deletedMovies,
  hideIsLoading,
  moviesAction,
  showIsLoading,
  savedMoviesAction,
  showMoviesAction,
  showSearchSavedMoviesAction,
} from "../actions";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";

//Сохранение массива фильмов из внешнего API в локальное хранилище
const getMovies = () => {
  return (dispatch) => {
    if (!localStorage.getItem("storageMovies")) {
      dispatch(showIsLoading());
      return moviesApi
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
        console.log(res);
        dispatch(savedMoviesAction(res));
      })
      .catch((err) => console.log(err));
  };
};

// Поиск фильмов по ключевым словам в локальном хранилище
const handleSearchByWord = (word, isShortMovies) => {
  return (dispatch) => {
    const storageMovies = JSON.parse(localStorage.getItem("storageMovies"));
    const searchByWords = storageMovies.filter((item) => {
      if (isShortMovies) {
        return item.duration <= 40 && item.nameRU.toLowerCase().includes(word.toLowerCase());
      }
      return item.nameRU.toLowerCase().includes(word.toLowerCase());
    });
    dispatch(moviesAction(searchByWords));
    dispatch(showMoviesAction(handleSearchFilms(searchByWords)));
    //setIsNotFoundSearch(true);
  };
};

// Поиск фильмов по ключевым словам в сохраненных фильмов
const handleSearchByWordSaved = (word, isShortMovies, isSavedMovie) => {
  return (dispatch) => {
    const searchByWords = isSavedMovie.filter((item) => {
      if (isShortMovies) {
        return item.duration <= 40 && item.nameRU.toLowerCase().includes(word.toLowerCase());
      }
      return item.nameRU.toLowerCase().includes(word.toLowerCase());
    });
    dispatch(showSearchSavedMoviesAction(handleSearchFilms(searchByWords)));
    //setIsNotFoundSearch(true);
  };
};

//В зависимости от разрешения показывать разное кол-во фильмов
const handleSearchFilms = (searchByWords) => {
  if (window.innerWidth >= 1280) {
    return searchByWords.slice(0, 12);
  }
  if (window.innerWidth >= 768) {
    console.log(searchByWords);
    return searchByWords.slice(0, 8);
  }
  if (window.innerWidth >= 320) {
    return searchByWords.slice(0, 5);
  }
};

export { getMovies, handleGetSavedMovies, handleLikeClick, handleSearchByWord, handleSearchByWordSaved };
