import "./SearchForm.css";
import logoSearch from "../../images/logo-search.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = (props) => {
  const { onSubmit, handleChange, values, setIsShortMovies, isShortMovies } = props;

  return (
    <section className="searchForm">
      <form className="searchForm__form" onSubmit={onSubmit}>
        <fieldset className="searchForm__form-fieldset">
          <input
            className="searchForm__form-input"
            id="movies"
            placeholder="Фильм"
            type="search"
            name="name"
            required
            value={values.name || ""}
            onChange={handleChange}
          />
          <button className="searchForm__button" type="submit">
            <img src={logoSearch} alt="лого поиска" />
          </button>
        </fieldset>
        <FilterCheckbox setIsShortMovies={setIsShortMovies} isShortMovies={isShortMovies} />
      </form>
    </section>
  );
};

export default SearchForm;
