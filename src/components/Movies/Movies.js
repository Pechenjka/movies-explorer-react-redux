import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFormWithValidation from "../../hooks/useForm";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import { handleSearchByWord } from "../../redux/Actions/moviesActions";
import { isShortMoviesFalse, hideIsNotFoundSearch, showMoviesAction } from "../../redux/actions";

const Movies = () => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.app.isLoading);
  const movies = useSelector((state) => state.movie.movies);
  const showMovies = useSelector((state) => state.movie.showSearchMovies);
  const isShortMovies = useSelector((state) => state.movie.isShortMovies);

  const { values, handleChange } = useFormWithValidation();

  useEffect(() => {
    dispatch(isShortMoviesFalse());
    // eslint-disable-next-line
  }, [isShortMoviesFalse]);

  //Эффект показывает короткометражные фильмы
  useEffect(() => {
    if (isShortMovies === false) {
      dispatch(hideIsNotFoundSearch());
      dispatch(showMoviesAction([]));
    }
    if (isShortMovies === true) {
      console.log(isShortMovies);
      dispatch(handleSearchByWord(values.name, isShortMovies));
    }
    // eslint-disable-next-line
  }, [isShortMovies, values]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(handleSearchByWord(values.name, isShortMovies));
  };

  //Показывать дополнительные фильмы кликом по кнопке
  const handleAddMovies = (dataMovies) => {
    if (window.innerWidth >= 1280) {
      return movies.slice(0, dataMovies.length + 3);
    }
    if (window.innerWidth >= 320) {
      return movies.slice(0, dataMovies.length + 2);
    }
  };

  const handleChangeAddMovies = () => {
    dispatch(showMoviesAction(handleAddMovies(showMovies)));
  };

  const hiddenButton =
    showMovies.length <= 3 || showMovies.length === movies.length || isShortMovies === true
      ? "movies__button_hidden"
      : "";

  return (
    <Fragment>
      <Header />
      <div className="movies">
        <SearchForm onSubmit={handleSubmit} values={values} handleChange={handleChange} />
        {loader ? <Preloader /> : <MoviesCardList showMovies={showMovies} />}
        <button className={`movies__button ${hiddenButton}`} onClick={handleChangeAddMovies}>
          Еще
        </button>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Movies;
