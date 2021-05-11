import {
  CREATE_USER,
  CURRENT_USER,
  HIDE_ERROR_SUBMIT,
  HIDE_ISLOADING,
  IS_LOGGED_IN_FALSE,
  IS_LOGGED_IN_TRUE,
  SHOW_ERROR_SUBMIT,
  SHOW_ISLOADING,
  PATH_MOVIE,
} from "./types";

import mainApi from "../utils/MainApi";
import { useHistory } from "react-router-dom";

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

// const createUser = () => {
//   return {
//     type: CREATE_USER,
//   };
// };

// const pathMovie = () => {
// const history = useHistory()
//   return {
//     type: PATH_MOVIE,
//     payload: history.push("/movies")
//   };
// };

// const currentUser = (values) => {
//   return {
//     type: CURRENT_USER,
//     payload: values,
//   };
// };

const isLoggedInTrue = () => {
  return {
    type: IS_LOGGED_IN_TRUE,
  };
};
const isLoggedInFalse = () => {
  return {
    type: IS_LOGGED_IN_FALSE,
  };
};
const showErrorSubmit = () => {
  return {
    type: SHOW_ERROR_SUBMIT,
  };
};
const hideErrorSubmit = () => {
  return {
    type: HIDE_ERROR_SUBMIT,
  };
};
const currentUsers = (dataUser) => {
  return {
    type: CURRENT_USER,
    payload: dataUser,
  };
};

//Регистрация пользователя
const handleRegister = (values) => {
  const { name, email, password } = values;
  return (dispatch) => {
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          throw new Error({ message: "Не передано одно из полей" });
        }
        if (res) {
          // dispatch(createUser());
          dispatch(handleLogin(values));
          //        handleLogin(values);
        }
      })
      .catch((err) => {
        if (err) {
          dispatch(handleErrorSubmit());
          // handleErrorSubmit();
          console.log({ message: "Некорректно заполнено одно из полей" });
        }
      });
  };
};

//Авторизация пользователя
const handleLogin = (values) => {
  const { email, password } = values;
  // const path = history.push("/movies")
  return (dispatch) => {
    //const history = useHistory()
    mainApi
      .authorization(email, password)
      .then((res) => {
        if (!res) {
          throw new Error({ message: "Не передано одно из полей" });
        }
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          dispatch(isLoggedInTrue());
          dispatch(handleGetUserInfo());
          // const path = history.push("/movies");
          // dispatch({ type: PATH_MOVIE, payload: path });
          //console.log()
          //dispatch(path)
         // useHistory().push("/movies");
        }
      })
      .catch((err) => {
        if (err) {
          dispatch(handleErrorSubmit());
          //handleErrorSubmit();
          console.log({ message: "Необходимо пройти регистрацию" });
        }
      });
  };
};

const handleGetUserInfo = () => {
  return (dispatch) => {
    mainApi
      .getUserInfo()
      .then((res) => dispatch(currentUsers(res)))
      .catch(() => console.log("Пользователь не найден"));
  };
};


const handleErrorSubmit = () => {
  return (dispatch) => {
    dispatch(showErrorSubmit());
    //setErrorSubmit(true);
  };
};

const handleUpdateUser = (values) => {
  const { email, name } = values;
  return (dispatch) => {
    mainApi
      .setUserInfo(email, name)
      .then((res) => {
        dispatch(currentUsers(res));
      })
      .catch((err) => {
        if (err) {
          dispatch(handleErrorSubmit());
          //  handleErrorSubmit();
          console.log({ message: "При обновлении профиля произошла ошибка" });
        }
      });
  };
};

export {
  showIsLoading,
  hideIsLoading,
  handleRegister,
  handleLogin,
  hideErrorSubmit,
  handleUpdateUser,
  currentUsers,
  handleGetUserInfo,
  isLoggedInTrue,
  isLoggedInFalse,
  //pathMovie,
};
