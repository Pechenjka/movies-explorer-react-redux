import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

const MoviesCardList = (props) => {
  const {
    showMovies,
    isSaved,
    handleLikeClick,
    isSavedMovie,
    isNotFoundSearch,
  } = props;

  return (
    <section className="moviesCardList">
      {isNotFoundSearch && showMovies.length === 0 ? (
        <p className="notFound_search">Ничего не найдено</p>
      ) : (
        <ul className="moviesCardList__container">
          {showMovies.map((item) => {
            return (
              <MoviesCard
                key={item.movieId}
                item={item}
                isSaved={isSaved}
                handleLikeClick={handleLikeClick}
                isSavedMovie={isSavedMovie}
              />
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default MoviesCardList;
