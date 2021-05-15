import { combineReducers } from "redux";
import appReducer from "./appReducer";
import userReducer from "./userReducer";
import movieReducer from "./movieReduser";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  movie: movieReducer,
});

export default rootReducer;
