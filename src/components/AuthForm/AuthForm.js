import { Link, useLocation } from "react-router-dom";
import "./AuthForm.css";
import Logo from "../../images/logo-header.svg";
import { Fragment } from "react";

const AuthForm = (props) => {
  const {
    title,
    buttonName,
    textLink,
    text,
    linkPath,
    values,
    onSubmit,
    onChange,
    errors,
    isValid,
    errorSubmit,
    setErrorSubmit,
    textError,
  } = props;
  const { pathname } = useLocation();

  return (
    <div className="authForm">
      <Link to="/">
        <img className="form__logo" src={Logo} alt="Лого формы" />
      </Link>
      <h2 className="form__title">{title}</h2>
      <form className="form" onSubmit={onSubmit}>
        <fieldset className="form__fieldset">
          {pathname === "/signup" && (
            <Fragment>
              <label className="form__label">Имя</label>
              <input
                className="form__input"
                type="text"
                name="name"
                id="name"
                minLength="2"
                maxLength="30"
                required
                onChange={onChange}
                pattern="[a-zA-Zа-яА-ЯЁё\s\-]*"
                value={values.name || ""}
              />
              <span className="form__span" id="text-error">
                {errors.name}
              </span>
            </Fragment>
          )}
          <label className="form__label">E-mail</label>
          <input
            className="form__input"
            type="email"
            name="email"
            id="email"
            required
            onChange={onChange}
            value={values.email || ""}
          />
          <span className="form__span" id="email-error">
            {errors.email}
          </span>
          <label className="form__label">Пароль</label>
          <input
            className={`form__input ${errors.password ? "form__input_inValid" : ""}`}
            type="password"
            name="password"
            id="password"
            minLength="8"
            required
            value={values.password || ""}
            onChange={onChange}
          />
          <span className="form__span" id="password-error">
            {errors.password}
          </span>
        </fieldset>
        <span
          className={`form__span form__span-error-button ${
            errorSubmit === true ? "form__span-error-button_active" : ""
          } `}
          id="text-error"
        >
          {textError}
        </span>
        <button className={`form__button ${!isValid ? "form__button_disabled" : ""}`} type="submit" disabled={!isValid}>
          {buttonName}
        </button>
        <p className="form__link-text">
          {text}
          <Link className="form__link" to={linkPath} onClick={() => setErrorSubmit(false)}>
            {textLink}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
