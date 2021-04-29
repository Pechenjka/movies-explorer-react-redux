import "./AboutMe.css";
import ListLinks from "../ListLinks/ListLinks";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

const AboutMe = () => {
  const links = [
    { id: "1", name: "Github", path: "https://github.com/PetyaLobachev" },
    { id: "2", name: "Vk", path: "https://vk.com/pe4enjkka" },
  ];

  return (
    <section className="aboutMe">
      <HeaderComponent title="Студент" />
      <div className="aboutMe__body">
        <div className="aboutMe__body_about-author">
          <h3 className="aboutMe__body_title">Петр</h3>
          <p className="aboutMe__body_specialty">Веб-разработчик, 34 года</p>
          <p className="aboutMe__body_text">
            Я родился в г. Волгоград. Закончив учебу в университете переехал жить в Москву в 2009 г. Проработал 10 лет
            архитектором. В интернете случайно наткнулся на курсы программиста. Решил попробовать свои силы в
            веб-разработке, в итоге увлекся и решил пройти курс до конца (10 месяцев). Пройдя половину курса, пришлось
            выбирать - либо работа, либо учеба. В итоге уволился с работы и продолжил изучение новой профессии. У меня
            есть жена и сын, которые меня очень поддерживают. Увлекаюсь спортом. В данный момент нахожусь в поисках
            работы.
          </p>
          <ListLinks links={links} />
        </div>
        <div className="aboutMe__body_author"></div>
      </div>
    </section>
  );
};

export default AboutMe;
