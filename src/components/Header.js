import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <a href="#" className="header__link">
        <img src={logo} alt="Логотип сервиса Mesto" className="header__logo" />
      </a>
    </header>
  );
}

export default Header;
