import { HIDE_IS_LOADING, SHOW_IS_LOADING } from "../types";

const initialState = {
  isLoading: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_IS_LOADING:
      return { ...state, isLoading: true}
      case HIDE_IS_LOADING:
        return { ...state, isLoading: false}
    default:
      return state;
  }
};

export default appReducer;
