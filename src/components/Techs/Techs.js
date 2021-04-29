import HeaderComponent from "../HeaderComponent/HeaderComponent";
import "./Techs.css";

const Techs = () => {
  const stackTechs = ["HTML", "CSS", "JS", "React", "Git", "Express", "mongoDB"];
  return (
    <section className="techs">
      <div className='techs__container'>
        <HeaderComponent title="Технологии" />
        <div className="techs__body">
          <h3 className="techs__body-title">7 технологий</h3>
          <p className="techs__body-text">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
        </div>
        <ul className="techs__stack">
          {stackTechs.map((item) => (
            <li className="techs__stack_container" key={item.toString()}>
              <p className="techs__stack_item">{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Techs;
