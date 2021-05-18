import {
  CURRENT_USER,
  HIDE_ERROR_SUBMIT,
  HIDE_IS_LOADING,
  IS_LOGGED_IN_FALSE,
  IS_LOGGED_IN_TRUE,
  SHOW_ERROR_SUBMIT,
  SHOW_IS_LOADING,
  SHOW_IS_EDIT_PROFILE, HIDE_IS_EDIT_PROFILE,
} from "../types";

import mainApi from "../../utils/MainApi";

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
const currentUser = (dataUser) => {
  return {
    type: CURRENT_USER,
    payload: dataUser,
  };
};

const showIsEditProfile = () => {
  return {
    type: SHOW_IS_EDIT_PROFILE,
  }
}

const hideIsEditProfile = () => {
  return {
    type: HIDE_IS_EDIT_PROFILE,
  }
}


//Регистрация пользователя
const handleRegister = (values, history) => {
  const { name, email, password } = values;
  return (dispatch) => {
    mainApi
      .register(name, email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          throw new Error({ message: "Не передано одно из полей" });
        }
        if (res) {
          dispatch(handleLogin(values, history));
        }
      })
      .catch((err) => {
        if (err) {
          dispatch(handleErrorSubmit());
          console.log({ message: "Некорректно заполнено одно из полей" });
        }
      });
  };
};

//Авторизация пользователя
const handleLogin = (values, history) => {
  const { email, password } = values;
  return (dispatch) => {
    mainApi
      .authorization(email, password)
      .then((res) => {
        if (!res) {
          throw new Error({ message: "Не передано одно из полей" });
        }
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          dispatch(handleGetUserInfo());
          dispatch(isLoggedInTrue());
          history.push("/movies");
        }
      })
      .catch((err) => {
        if (err) {
          dispatch(handleErrorSubmit());
          console.log({ message: "Необходимо пройти регистрацию" });
        }
      });
  };
};

const handleGetUserInfo = () => {
  return (dispatch) => {
    mainApi
      .getUserInfo()
      .then((res) => dispatch(currentUser(res)))
      .catch(() => console.log("Пользователь не найден"));
  };
};

const handleErrorSubmit = () => {
  return (dispatch) => {
    dispatch(showErrorSubmit());
  };
};

const handleUpdateUser = (values) => {
  const { email, name } = values;
  return (dispatch) => {
    mainApi
      .setUserInfo(email, name)
      .then((res) => {
        dispatch(currentUser(res));
        dispatch(hideIsEditProfile())
      })
      .catch((err) => {
        if (err) {
          dispatch(handleErrorSubmit());
          console.log({ message: "При обновлении профиля произошла ошибка" });
        }
      });
  };
};

export {
  showIsLoading,
  hideIsLoading,
  handleRegister,
  handleErrorSubmit,
  handleLogin,
  hideErrorSubmit,
  handleUpdateUser,
  currentUser,
  handleGetUserInfo,
  isLoggedInTrue,
  isLoggedInFalse,
  hideIsEditProfile,
  showIsEditProfile,
};
