import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import HeaderLogo from "../../images/logo-header.svg";
import burgerMenuIcon from "../../images/burger-menu-icon.svg";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useState } from "react";

const Navigation = (props) => {
  const { loggedIn } = props;

  const [isBurgerMenu, setIsBurgerMenu] = useState(false);

  const itemsNavigation = [
    { name: "Регистрация", path: "/signup", id: "1" },
    { name: "Вход", path: "/signin", className: "navigation__link-button", id: "2" },
  ];
  const AuthNavigation = [
    { name: "Фильмы", path: "/movies", id: "1" },
    { name: "Сохраненные фильмы", path: "/saved-movies", id: "2" },
    { name: "Аккаунт", path: "/profile", className: "navigation__link-account_logo", id: "3" },
  ];

  const classesLinkContainer = `navigation__link-container ${
    loggedIn === true ? "navigation__link-container_auth" : ""
  } `;

  const listlinksUnACtive = loggedIn === true ? "navigation__list-links_unActive" : "";

  return (
    <nav className="navigation">
      <Link to="/">
        <img className="navigation__logo" src={HeaderLogo} alt="лого" />
      </Link>

      <ul className={`navigation__list-links ${listlinksUnACtive}`}>
        {(loggedIn === true ? AuthNavigation : itemsNavigation).map((item) => {
          return (
            <li className={classesLinkContainer} key={item.id}>
              <NavLink
                className={`navigation__link ${item.className}`}
                activeClassName="navigation__link-current-address"
                to={item.path}
              >
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
      {loggedIn === true && (
        <div className="navigation__burger " onClick={() => isBurgerMenu === false && setIsBurgerMenu(true)}>
          <img className="navigation__burger-icon" src={burgerMenuIcon} alt="Иконка бургер-меню" />
          <BurgerMenu isBurgerMenu={isBurgerMenu} setIsBurgerMenu={setIsBurgerMenu} />
        </div>
      )}
    </nav>
  );
};

export default Navigation;
