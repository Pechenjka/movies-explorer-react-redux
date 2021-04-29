import "./HeaderComponent.css";

const HeaderComponent = (props) => {
  const { title } = props;
  return (
    <header className="headerComponent">
      <p className="headerComponent__title">{title}</p>
    </header>
  );
};

export default HeaderComponent;
