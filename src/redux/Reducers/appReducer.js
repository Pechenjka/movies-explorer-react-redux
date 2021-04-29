import { HIDE_ISLOADING, SHOW_ISLOADING } from "../types";

const initialState = {
  isLoading: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ISLOADING:
      return { ...state, isLoading: true}
      case HIDE_ISLOADING:
        return { ...state, isLoading: false}
    default:
      return state;
  }
};

export default appReducer;
