import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header
      className={`header ${
        pathname === "/movies" || pathname === "/saved-movies" || pathname === "/profile" ? "header-black" : ""
      } `}
    >
      <Navigation />
    </header>
  );
};

export default Header;
