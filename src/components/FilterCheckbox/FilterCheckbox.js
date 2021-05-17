import "./FilterCheckbox.css";
import { useDispatch, useSelector } from "react-redux";
import { isShortMoviesFalse, isShortMoviesTrue } from "../../redux/actions";

const FilterCheckbox = () => {
  const dispatch = useDispatch();
  const isShortMovies = useSelector((state) => state.movie.isShortMovies);

  const handleShortMovies = () => {
    if (isShortMovies === false) dispatch(isShortMoviesTrue());
    if (isShortMovies === true) dispatch(isShortMoviesFalse());
  };

  return (
    <fieldset className="filterCheckbox">
      <label className="filterCheckbox__input-switch">
        <input type="checkbox" className="filterCheckbox__input" onChange={handleShortMovies} /> Короткометражки
        <span className="filterCheckbox__input_slider" />
      </label>
    </fieldset>
  );
};

export default FilterCheckbox;
