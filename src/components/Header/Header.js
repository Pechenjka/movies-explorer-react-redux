import { useLocation } from "react-router";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = (props) => {
  const { loggedIn } = props;
  const { pathname } = useLocation();

  return (
    <header className={`header ${(pathname === "/movies" || pathname === "/saved-movies" || pathname === '/profile') ? "header-black" : ""} `}>
      <Navigation loggedIn={loggedIn} />
    </header>
  );
};

export default Header;
