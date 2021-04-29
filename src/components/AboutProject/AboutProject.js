import HeaderComponent from "../HeaderComponent/HeaderComponent";
import "./AboutProject.css";

const AboutProject = () => {
  const aboutProject = [
    {
      header: "Дипломный проект включал 5 этапов",
      paragraph: "Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.",
      id: "1",
    },
    {
      header: "На выполнение диплома ушло 5 недель",
      paragraph:
        "У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.",
      id: "2",
    },
  ];

  const timeTable = [
    { header: "1 неделя", firstRow: "Back-end", id: "1" },
    { header: "4 недели", firstRow: "Front-end", id: "2" },
  ];

  return (
    <section className="aboutProject" id = 'aboutProject' >
      <HeaderComponent title="О проекте" />
      <ul className="aboutProject__list">
        {aboutProject.map((item) => {
          return (
            <li className="aboutProject__list_container" key={item.id}>
              <h3 className="aboutProject__list_title">{item.header}</h3>
              <p className="aboutProject__list_description">{item.paragraph}</p>
            </li>
          );
        })}
      </ul>
      <table className="aboutProject__table">
        {timeTable.map((item) => {
          return (
            <thead className="aboutProject__table_container" key={item.id}>
              <tr>
                <th className="aboutProject__table_header">{item.header}</th>
                <td className="aboutProject__table_row">{item.firstRow}</td>
              </tr>
            </thead>
          );
        })}
      </table>
    </section>
  );
};

export default AboutProject;
