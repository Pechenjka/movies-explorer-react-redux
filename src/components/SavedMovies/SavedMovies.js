import "./SavedMovies.css";
import { Fragment, useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import useFormWithValidation from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { handleSearchByWordSaved } from "../../redux/Actions/moviesActions";
import { showSearchSavedMoviesAction, isShortMoviesFalse, hideIsNotFoundSearch } from "../../redux/actions";

const SavedMovies = () => {
  const dispatch = useDispatch();
  const isSavedMovie = useSelector((state) => state.movie.savedMovies);
  const showSearchSavedMovies = useSelector((state) => state.movie.showSearchSavedMovies);
  const isShortMovies = useSelector((state) => state.movie.isShortMovies);
  const [isSaved, setIsSaved] = useState(false);
  const { values, handleChange } = useFormWithValidation();

  useEffect(() => {
    dispatch(isShortMoviesFalse());
    setIsSaved(true);
  }, []);

  //Эффект показывает короткометражные фильмы
  useEffect(() => {
    if (isShortMovies === false || values.name === "") {
      dispatch(showSearchSavedMoviesAction(isSavedMovie));
      dispatch(hideIsNotFoundSearch());
    }
    if (isShortMovies === true && values.name) {
      dispatch(handleSearchByWordSaved(values.name, isShortMovies, isSavedMovie));
    }
    // eslint-disable-next-line
  }, [isShortMovies, isSavedMovie, values]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(handleSearchByWordSaved(values.name, isShortMovies, isSavedMovie));
  };

  return (
    <Fragment>
      <Header />
      <section className="savedMovies">
        <SearchForm onSubmit={handleSubmit} values={values} handleChange={handleChange} isSaved={isSaved} />
        <MoviesCardList showMovies={showSearchSavedMovies} isSaved={isSaved}  />
      </section>
      <Footer />
    </Fragment>
  );
};

export default SavedMovies;
