import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { useSelector } from "react-redux";

const MoviesCardList = (props) => {
  const { showMovies, isSaved } = props;
  const isNotFoundSearch = useSelector((state) => state.movie.isNotFoundSearch);

  return (
    <section className="moviesCardList">
      {isNotFoundSearch && showMovies.length === 0 ? (
        <p className="notFound_search">Ничего не найдено</p>
      ) : (
        <ul className="moviesCardList__container">
          {showMovies.map((item) => {
            return <MoviesCard key={item.movieId} item={item} isSaved={isSaved} />;
          })}
        </ul>
      )}
    </section>
  );
};

export default MoviesCardList;
