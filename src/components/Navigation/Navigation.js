import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import HeaderLogo from "../../images/logo-header.svg";
import burgerMenuIcon from "../../images/burger-menu-icon.svg";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useDispatch, useSelector } from "react-redux";
import { showBurgerMenuAction } from "../../redux/Actions/appActions";

const Navigation = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.isLoggedIn);
  const isBurgerMenu = useSelector((state) => state.app.isBurgerMenu);

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

  const listLinksUnActive = loggedIn === true ? "navigation__list-links_unActive" : "";

  return (
    <nav className="navigation">
      <Link to="/">
        <img className="navigation__logo" src={HeaderLogo} alt="лого" />
      </Link>

      <ul className={`navigation__list-links ${listLinksUnActive}`}>
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
        <div className="navigation__burger" onClick={() => isBurgerMenu === false && dispatch(showBurgerMenuAction())}>
          <img className="navigation__burger-icon" src={burgerMenuIcon} alt="Иконка бургер-меню" />
          <BurgerMenu />
        </div>
      )}
    </nav>
  );
};

export default Navigation;
