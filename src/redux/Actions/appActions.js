import { HIDE_IS_BURGER_MENU, HIDE_IS_LOADING, SHOW_IS_BURGER_MENU, SHOW_IS_LOADING } from "../types";

const showIsLoading = () => {
  return {
    type: SHOW_IS_LOADING,
  };
};
const hideIsLoading = () => {
  return {
    type: HIDE_IS_LOADING,
  };
};

const showBurgerMenuAction = () => {
  return {
    type: SHOW_IS_BURGER_MENU,
  };
};

const hideBurgerMenuAction = () => {
  return {
    type: HIDE_IS_BURGER_MENU,
  };
};

export { showIsLoading, hideIsLoading, showBurgerMenuAction, hideBurgerMenuAction };
