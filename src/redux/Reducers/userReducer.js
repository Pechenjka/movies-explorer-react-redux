import {
  SHOW_ERROR_SUBMIT,
  HIDE_ERROR_SUBMIT,
  IS_LOGGED_IN_TRUE,
  IS_LOGGED_IN_FALSE,
  CURRENT_USER,
} from "../types";

const initialState = {
  errorSubmit: false,
  isLoggedIn: false,
  currentUser: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case IS_LOGGED_IN_TRUE:
      return { ...state, isLoggedIn: true };
    case IS_LOGGED_IN_FALSE:
      return { ...state, isLoggedIn: false };
    case SHOW_ERROR_SUBMIT:
      return { ...state, errorSubmit: true };
    case HIDE_ERROR_SUBMIT:
      return { ...state, errorSubmit: false };
    default:
      return state;
  }
};

export default userReducer;
