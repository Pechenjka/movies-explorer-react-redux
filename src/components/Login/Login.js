import { useEffect } from "react";
import useFormWithValidation from "../../hooks/useForm";
import AuthForm from "../AuthForm/AuthForm";
import { useDispatch } from "react-redux";
import {handleLogin, pathMovie} from "../../redux/actions";
import {useHistory, useLocation} from "react-router-dom";

const Login = () => {

  const {pathname}= useLocation()
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
   // const path = history.push("/movies");
   // const history = useHistory();
    //history.push('/movies');
    dispatch(handleLogin(values));
   // dispatch(pathMovie());
    //console.log(pathname)
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <AuthForm
      title="Рады видеть!"
      buttonName="Войти"
      text="Ещё не зарегистрированы?"
      textLink="Регистрация"
      linkPath="/signup"
      textError="Авторизация не удалась"
      values={values}
      onSubmit={handleSubmit}
      onChange={handleChange}
      errors={errors}
      isValid={isValid}
    />
  );
};

export default Login;
