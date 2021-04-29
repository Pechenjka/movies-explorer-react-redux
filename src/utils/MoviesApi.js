const checkResponse = (res) => (res.ok ? res.json() : Promise.reject(`Error: ${res.status}`));

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  searchFilms() {
    return fetch(this._baseUrl)
      .then(checkResponse)
      .then((res) => res);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
});

export default moviesApi;
