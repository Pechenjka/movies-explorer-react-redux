import { Fragment } from "react";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Portfolio from "../Portfolio/Portfolio";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import "./Main.css";

const Main = (props) => {
  const { loggedIn } = props;

  return (
    <Fragment>
      <Header loggedIn={loggedIn} />
      <main className="content">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Main;
