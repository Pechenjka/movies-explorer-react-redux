import { SHOW_IS_SAVED_MOVIES } from "../types";

const initialState = {
  savedMovies: [],
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_IS_SAVED_MOVIES:
      return { ...state, savedMovies: state.savedMovies.concat(action.payload) };
    default:
      return state;
  }
};

export default movieReducer;
