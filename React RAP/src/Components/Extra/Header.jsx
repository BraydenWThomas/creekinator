import "../styles/components/Header.scss";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { Button, IconButton } from "@mui/material";
import { LinkButton } from "./Button";
import { Menu } from "@mui/icons-material";
import { useState } from "react";

const Header = ({ links = [{ name: "", url: "" }], sticky = false, creds = true }) => {
  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <header className={`${"header"} ${sticky ? "sticky" : ""}`}>
      <div className={`header-wrapper ${menuToggle ? "active" : "not-active"}`}>
        <div className="header__responsive-wrapper">
          <a className="header__logo-wrapper" href={links[0].url}>
            <Logo className="header__logo" alt="Logo of application that says 'Recruitinator'" />
          </a>
          <IconButton
            className={`header__burger ${menuToggle ? "active" : "not-active"}`}
            disableRipple={true}
            onClick={() => {
              setMenuToggle(!menuToggle);
            }}>
            <Menu />
          </IconButton>
        </div>
        <nav className="header-nav">
          <ul className="header-nav-list nav-list">
            {links.map((link, index) => {
              return (
                <li className="header-nav-list__item nav-list__item">
                  <LinkButton url={link.url} className={`${menuToggle ? "" : "not-active"}`}>
                    {link.name}
                  </LinkButton>
                </li>
              );
            })}
          </ul>
        </nav>
        {creds ? (
          <div className="header-creds">
            <Button disableRipple={true}>Logout</Button>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
