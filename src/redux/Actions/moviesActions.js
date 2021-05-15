import { hideIsLoading, showIsLoading, showIsSavedMovies } from "../actions";
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

//Отображение сохраненных фильмов
const handleGetSavedMovies = () => {
  return (dispatch) => {
    return mainApi
      .getSavedMovies()
      .then((res) => {
       // if (res) {
        console.log(res);
        dispatch(showIsSavedMovies(res));
     //  }
      })
      .catch((err) => console.log(err));
  };
};

export { getMovies, handleGetSavedMovies };
