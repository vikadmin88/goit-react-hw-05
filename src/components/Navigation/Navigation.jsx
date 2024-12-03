import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <ul className={css.list}>
        <li className={css.listItem}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies" className={buildLinkClass}>
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink to="https://github.com/vikadmin88/goit-react-hw-05" className={buildLinkClass}>
            (c)ViktorK
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
