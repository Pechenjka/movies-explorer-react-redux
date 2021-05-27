import { NavLink } from "react-router-dom";
import "./BurgerMenu.css";
import { useDispatch, useSelector } from "react-redux";
import { hideBurgerMenuAction } from "../../redux/Actions/appActions";

const BurgerMenu = () => {
  const dispatch = useDispatch();
  const isBurgerMenu = useSelector((state) => state.app.isBurgerMenu);

  const BurgerMenuLinks = [
    { name: "Главная", path: "/", id: "1" },
    { name: "Фильмы", path: "/movies", id: "2" },
    { name: "Сохраненные фильмы", path: "/saved-movies", id: "3" },
    { name: "Аккаунт", path: "/profile", className: "burgerMenu__link-account_logo", id: "4" },
  ];

  const burgerMenu = `burgerMenu ${isBurgerMenu === true ? "burgerMenu__active" : ""}`;

  return (
    <div className={burgerMenu}>
      <button
        className="burgerMenu__button_close"
        type="button"
        onClick={() => isBurgerMenu === true && dispatch(hideBurgerMenuAction())}
      />
      <ul
        className="burgerMenu__list-container"
        onClick={() => isBurgerMenu === true && dispatch(hideBurgerMenuAction())}
      >
        {BurgerMenuLinks.map((item) => {
          return (
            <li className="burgerMenu__links-container" key={item.id} onClick={(e) => e.stopPropagation()}>
              <NavLink
                className={`burgerMenu__link ${item.className}`}
                activeClassName="burgerMenu__link-current-address"
                exact
                to={item.path}
                onClick={() => dispatch(hideBurgerMenuAction())}
              >
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BurgerMenu;
