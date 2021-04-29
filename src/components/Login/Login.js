import { useEffect } from "react";
import useFormWithValidation from "../../hooks/useForm";
import AuthForm from "../AuthForm/AuthForm";

const Login = (props) => {
  const { onLogin, errorSubmit, setErrorSubmit } = props;

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(values);
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
      errorSubmit={errorSubmit}
      setErrorSubmit={setErrorSubmit}
    ></AuthForm>
  );
};

export default Login;
