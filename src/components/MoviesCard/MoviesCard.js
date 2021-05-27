import { useEffect, useState } from "react";
import "./MoviesCard.css";
import { useDispatch, useSelector } from "react-redux";
import { handleLikeClick } from "../../redux/Actions/moviesActions";

const MoviesCard = (props) => {
  const { item, isSaved } = props;
  const isSavedMovie = useSelector((state) => state.movie.savedMovies);

  const [isSavedMovieButton, setIsSavedMovieButton] = useState(false);
  const dispatch = useDispatch();

  const handleSavedMovieClick = () => {
    dispatch(handleLikeClick(item, isSavedMovie));
    setIsSavedMovieButton(!isSavedMovieButton);
  };

  useEffect(() => {
    setIsSavedMovieButton(
      isSavedMovie.some((data) => {
        return data.movieId === item.movieId;
      })
    );
    // eslint-disable-next-line
  }, []);

  const saved = `card__button-saved-movie ${
    (isSaved === true ? "card__button-icon-saved" : "") ||
    (isSavedMovieButton === true ? "card__button-icon-handleSaved" : "")
  }`;

  const getTime = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч " + minutes + "m";
  };

  return (
    <li className="card">
      <div className="card__description-container">
        <p className="card__title">{item.nameRU}</p>
        <p className="card__duration">{getTime(item.duration)}</p>
        <button className={saved} onClick={handleSavedMovieClick} />
      </div>
      <a href={item.trailer} target="_blanck">
        <img className="card__movie" src={item.image} alt="постер" />
      </a>
    </li>
  );
};

export default MoviesCard;
