import { Fragment, useEffect } from "react";
import useFormWithValidation from "../../hooks/useForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

const Movies = (props) => {
  const {
    isLoading,
    loggedIn,
    onSearchFilms,
    showMovies,
    setIsShortMovies,
    isShortMovies,
    setShowMovies,
    movies,
    handleLikeClick,
    isSavedMovie,
    isNotFoundSearch,
  } = props;

  const { values, handleChange } = useFormWithValidation();

  //Эффект показывает короткометражные фильмы
  useEffect(() => {
    if (isShortMovies === false) {
      onSearchFilms(values.name);
    }
    if (isShortMovies === true) {
      onSearchFilms(values.name);
    }
    // eslint-disable-next-line
  }, [isShortMovies]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchFilms(values.name);
  };

  //Показывать дополнительные фильмы кликом по кнопке
  const handleAddMovies = () => {
    if (window.innerWidth >= 1280) {
      const addMoviesMaxWidth = movies.slice(0, showMovies.length + 3);
      return addMoviesMaxWidth;
    }
    if (window.innerWidth >= 320) {
      const addMoviesMinWidth = movies.slice(0, showMovies.length + 2);
      return addMoviesMinWidth;
    }
  };

  const handleChangeAddMovies = () => {
    setShowMovies(handleAddMovies);
  };

  const hiddenButton =
    showMovies.length <= 3 || showMovies.length === movies.length || isShortMovies === true
      ? "movies__button_hidden"
      : "";

  return (
    <Fragment>
      <Header loggedIn={loggedIn} />
      <div className="movies">
        <SearchForm
          onSubmit={handleSubmit}
          values={values}
          handleChange={handleChange}
          setIsShortMovies={setIsShortMovies}
          isShortMovies={isShortMovies}
        />
        {isLoading === true ? (
          <Preloader />
        ) : (
          <MoviesCardList
            showMovies={showMovies}
            movies={movies}
            handleLikeClick={handleLikeClick}
            isSavedMovie={isSavedMovie}
            isNotFoundSearch={isNotFoundSearch}
          />
        )}
        <button className={`movies__button ${hiddenButton}`} onClick={handleChangeAddMovies}>
          Еще
        </button>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Movies;
