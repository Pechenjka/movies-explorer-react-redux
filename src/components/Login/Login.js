import { useEffect } from "react";
import useFormWithValidation from "../../hooks/useForm";
import AuthForm from "../AuthForm/AuthForm";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../redux/actions";
import { useHistory } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(handleLogin(values, history));
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
