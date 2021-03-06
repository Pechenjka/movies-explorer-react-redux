import {
  DELETED_MOVIES,
  SHOW_SEARCH_SAVED_MOVIES,
  MOVIES,
  SAVED_MOVIES,
  SHOW_SEARCH_MOVIES,
  IS_SHORT_MOVIES_TRUE,
  IS_SHORT_MOVIES_FALSE,
  SHOW_IS_NOT_FOUND_SEARCH,
  HIDE_IS_NOT_FOUND_SEARCH,
} from "../types";

const initialState = {
  savedMovies: [],
  movies: [],
  showSearchMovies: [],
  showSearchSavedMovies: [],
  isShortMovies: false,
  isNotFoundSearch: false,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIES:
      return { ...state, movies: action.payload };
    case SHOW_SEARCH_MOVIES:
      return { ...state, showSearchMovies: action.payload };
    case SAVED_MOVIES:
      return { ...state, savedMovies: state.savedMovies.concat(action.payload) };
    case SHOW_SEARCH_SAVED_MOVIES:
      return { ...state, showSearchSavedMovies: action.payload };
    case DELETED_MOVIES:
      return { ...state, savedMovies: state.savedMovies.filter((item) => item.movieId !== action.payload.movieId) };
    case IS_SHORT_MOVIES_TRUE:
      return { ...state, isShortMovies: true };
    case IS_SHORT_MOVIES_FALSE:
      return { ...state, isShortMovies: false };
    case SHOW_IS_NOT_FOUND_SEARCH:
      return { ...state, isNotFoundSearch: true };
    case HIDE_IS_NOT_FOUND_SEARCH:
      return { ...state, isNotFoundSearch: false };
    default:
      return state;
  }
};

export default movieReducer;
