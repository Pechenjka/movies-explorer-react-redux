import ListLinks from "../ListLinks/ListLinks";
import "./Footer.css";

const Footer = () => {
  const links = [
    { id: "1", name: "Яндекс.Практикум", path: "https://praktikum.yandex.ru/", classeslink: "links__link_footer", classesListContainer: "links__list-container_footer" },
    { id: "2", name: "Github", path: "https://github.com/PetyaLobachev", classeslink: "links__link_footer", classesListContainer: "links__list-container_footer" },
    { id: "3", name: "Vk", path: "https://vk.com/pe4enjkka", classeslink: "links__link_footer", classesListContainer: "links__list-container_footer"},
  ];
  return (
    <footer className="footer">
      <div className="footer__title-container">
        <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      </div>
      <div className="footer__links">
        <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
        <ListLinks classListFooter='links__list_footer' links={links} />
      </div>
    </footer>
  );
};

export default Footer;
