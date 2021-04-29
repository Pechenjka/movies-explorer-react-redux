import "./Portfolio.css";
import linkIcon from "../../images/link-icon.svg";

const Portfolio = () => {
  const linksPortfolio = [
    { name: "Статичный сайт", link: "https://github.com/PetyaLobachev/how-to-learn", id: "1" },
    { name: "Адаптивный сайт", link: "https://github.com/PetyaLobachev/russian-travel", id: "2" },
    { name: "Одностраничное приложение", link: "https://lobachev.students.nomoreparties.space/", id: "3" },
  ];

  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list-link">
        {linksPortfolio.map((item) => {
          return (
            <li key={item.id} className="portfolio__link-container">
              <a className="portfolio__link" href={item.link} target="blank" rel="noopener">
                <img className="portfolio__link-icon" src={linkIcon} alt="лого ссылки" />
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Portfolio;
