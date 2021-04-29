import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../context/CurrentUserContext";
import useFormWithValidation from "../../hooks/useForm";
import Header from "../Header/Header";
import "./Profile.css";

const Profile = (props) => {
  const { onSignOut, onUpdateUser, loggedIn, errorSubmit } = props;
  
  const [isEditProfile, setIsEditProfile] = useState(false);
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  const isDisabledInput = isEditProfile === false && "disabled";

  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateUser(values);
  };

  useEffect(() => {
    currentUser && resetForm(currentUser);
  }, [currentUser, resetForm]);

  return (
    <Fragment>
      <Header loggedIn={loggedIn} />
      <div className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <fieldset className="profile__form_fieldset">
            <label className="profile__form_label">Имя</label>
            <input
              className="profile__form_input"
              type="text"
              name="name"
              id="name"
              minLength="2"
              maxLength="30"
              disabled={isDisabledInput}
              required
              value={values.name || ""}
              onChange={handleChange}
            />
            <span className="profile__form_span" id="text-error">
              {errors.name}
            </span>
            <label className="profile__form_label">E-mail</label>
            <input
              className="profile__form_input"
              type="email"
              name="email"
              id="email"
              disabled={isDisabledInput}
              required
              value={values.email || ""}
              onChange={handleChange}
            />
            <span className="profile__form_span" id="email-error">
              {errors.email}
            </span>
          </fieldset>
          {isEditProfile === true ? (
            <Fragment>
              <span
                className={`profile__saved-button-span ${errorSubmit ? "profile__saved-button-span_active" : ""}`}
                id="text-error"
              >
                При обновлении профиля произошла ошибка.
              </span>
              <button
                className={`profile__saved-button ${!isValid ? "profile__saved-button_disabled" : ""}`}
                type="submit"
                disabled={!isValid}
              >
                Сохранить
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <button className="profile__form_button" onClick={() => setIsEditProfile(true)}>
                Редактировать
              </button>
              <Link to="/" className="profile__form_link" onClick={onSignOut}>
                Выйти из аккаунта
              </Link>
            </Fragment>
          )}
        </form>
      </div>
    </Fragment>
  );
};

export default Profile;
