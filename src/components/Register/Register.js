import AuthForm from "../AuthForm/AuthForm";
import useFormWithValidation from "../../hooks/useForm";
import { useEffect } from "react";

const Register = (props) => {
  const { onRegister, errorSubmit, setErrorSubmit } = props;

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(values);
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <AuthForm
      title="Добро пожаловать!"
      buttonName="Зарегистрироваться"
      text="Уже зарегистрированы?"
      textLink="Войти"
      linkPath="/signin"
      textError="Регистрация не удалась"
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

export default Register;
