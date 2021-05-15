import "./SavedMovies.css";
import { Fragment, useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import useFormWithValidation from "../../hooks/useForm";
import { useSelector} from "react-redux";

const SavedMovies = (props) => {
  const {
    onSearchFilms,
    handleLikeClick,
    isNotFoundSearch,
    setIsShortMovies,
    isShortMovies,
    filterMovies,
    setFilterMovies,
  } = props;

  const isSavedMovie = useSelector((state => state.movie.savedMovies))
  const [isSaved, setIsSaved] = useState(false);
  const { values, handleChange } = useFormWithValidation();

  useEffect(() => {
    setIsSaved(true);
  }, [setIsSaved]);

  useEffect(() => {
    setFilterMovies(isSavedMovie);
  }, [setFilterMovies, isSavedMovie]);

  //Эффект показывает короткометражные фильмы
  useEffect(() => {
    if (values.name !== "") {
      onSearchFilms(values.name);
    }
    if (isShortMovies) {
      onSearchFilms(values.name);
    }
    if (!isShortMovies) {
      setFilterMovies(isSavedMovie);
    }
    // eslint-disable-next-line
  }, [isShortMovies]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchFilms(values.name);
  };

  return (
    <Fragment>
      <Header />
      <section className="savedMovies">
        <SearchForm
          onSubmit={handleSubmit}
          values={values}
          handleChange={handleChange}
          isSaved={isSaved}
          setIsShortMovies={setIsShortMovies}
          isShortMovies={isShortMovies}
        />
        <MoviesCardList
          showMovies={filterMovies}
          isSaved={isSaved}
          handleLikeClick={handleLikeClick}
          isNotFoundSearch={isNotFoundSearch}
        />
      </section>
      <Footer />
    </Fragment>
  );
};

export default SavedMovies;
