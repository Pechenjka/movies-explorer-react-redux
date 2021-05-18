import { HIDE_IS_BURGER_MENU, HIDE_IS_LOADING, SHOW_IS_BURGER_MENU, SHOW_IS_LOADING } from "../types";

const initialState = {
  isLoading: false,
  isBurgerMenu: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_IS_LOADING:
      return { ...state, isLoading: true };
    case HIDE_IS_LOADING:
      return { ...state, isLoading: false };
    case SHOW_IS_BURGER_MENU:
      return { ...state, isBurgerMenu: true };
    case HIDE_IS_BURGER_MENU:
      return { ...state, isBurgerMenu: false };
    default:
      return state;
  }
};

export default appReducer;
