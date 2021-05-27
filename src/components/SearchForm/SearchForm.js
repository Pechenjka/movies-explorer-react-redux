import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = (props) => {
  const { onSubmit, handleChange, values } = props;

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
          <button className="searchForm__button" type="submit"/>
        </fieldset>
        <FilterCheckbox />
      </form>
    </section>
  );
};

export default SearchForm;
