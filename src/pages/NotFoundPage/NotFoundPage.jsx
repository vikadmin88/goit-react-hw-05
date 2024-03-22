import { NavLink } from "react-router-dom";
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.notFound}>
      <NavLink to="/"className={css.notFoundLink}>Oops! Page not found! Clicke here to go home.</NavLink>
    </div>
  )
}

export default NotFoundPage