import AuthForm from "../AuthForm/AuthForm";
import useFormWithValidation from "../../hooks/useForm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleRegister } from "../../redux/Actions/userActions";
import { useHistory } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(handleRegister(values, history));
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
    />
  );
};

export default Register;
