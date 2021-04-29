import "./ListLinks.css";

const ListLinks = (props) => {
  const { links, classListFooter } = props;

  return (
    <ul className={`links__list ${classListFooter}`}>
      {links.map((item) => {
        return (
          <li className={`links__list-container ${item.classesListContainer}`} key={item.id}>
            <a
              href={item.path}
              target="blank"
              rel="noopener"
              className={`links__link ${item.classeslink}`}
              key={item.id}
            >
              {item.name}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default ListLinks;
