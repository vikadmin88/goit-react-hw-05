import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css'

const MovieList = ({ movies }) => {
  const location = useLocation();
  
  return (
    <ul className={css.list}>
    {movies.map(movie => (
      <li key={movie.id} className={css.listItem}>
        <Link state={{ from: location }} to={`/movies/${movie.id}`} className={css.itemLink}>
          {movie.title}&nbsp;
          {movie.release_date ? `(${movie.release_date.substring(0, 4)})` : ""}

        </Link>
      </li>
    ))}
    </ul>
  )
}

export default MovieList