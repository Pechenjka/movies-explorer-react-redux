import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="notFound">
      <h2 className="notFound__title">404</h2>
      <p className="notFound__description">Страница не найдена</p>
      <Link to="/" className="notFound__link">
        Назад
      </Link>
    </section>
  );
};

export default NotFound;
