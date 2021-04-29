import "./Promo.css";
import Main_logo from "../../images/landing-logo.svg";
import ScrollIntoView from "react-scroll-into-view";
const Promo = () => {
  return (
    <section className="promo">
      <div className="promo__wraper">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <p className="promo__description">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <ScrollIntoView selector="#aboutProject">
          <button className="promo__button">Узнать больше</button>
        </ScrollIntoView>
      </div>
      <img className="promo__logo" src={Main_logo} alt="Лого-глобус" />
    </section>
  );
};

export default Promo;
