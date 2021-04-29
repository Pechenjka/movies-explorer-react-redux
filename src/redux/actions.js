import { HIDE_ISLOADING, SHOW_ISLOADING } from "./types";

const showIsLoading = () => {
  return {
    type: SHOW_ISLOADING,
  };
};
const hideIsLoading = () => {
  return {
    type: HIDE_ISLOADING,
  };
};
export { showIsLoading, hideIsLoading };
