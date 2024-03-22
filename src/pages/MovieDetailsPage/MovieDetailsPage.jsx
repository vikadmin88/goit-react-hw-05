import { useRef, useEffect, useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";
import { IoArrowUndoSharp } from "react-icons/io5";
import clsx from "clsx";
import { getMovieById } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.addInfoLink, isActive && css.active);
};

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();
  const goBackLink = useRef(location.state?.from || "/movies");
  const defImg =
    "http://epowhost.com/under-construction-pexels-valery-anatolievich-17872703-1.jpg";

  useEffect(() => {
    if (!movieId) return;

    async function fetchDataByQuery() {
      try {
        setIsLoading(true);
        setIsError(false);

        const resp = await getMovieById(movieId);
        if (resp) {
          setMovie(resp);
        } else {
          toast.success("No movie found!");
        }
      } catch (err) {
        console.log(err);
        setIsError(true);
        toast.error(`Network error: ${err}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDataByQuery();
  }, [movieId]);

  return (
    <div className={css.pageContainer}>
      <NavLink to={goBackLink.current} className={css.backBtn}> <IoArrowUndoSharp /> Go Back</NavLink>
      {!isError && isLoading && <Loader />}
      {!isError && (
        <div className={css.detailsContainer}>
          <div className={css.detailsMain}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defImg
              }
              width={340}
              alt="movie poster"
            />
            <div className={css.detailsText}>
              <h1>
                {movie.title}&nbsp;
                {movie.release_date ? `(${movie.release_date.substring(0, 4)})` : ""}
              </h1>
              <p>
                User Score:&nbsp;
                {movie.vote_average ? Math.round(movie.vote_average * 10) : 0}%
              </p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <ul className={css.genres}>
                {movie.genres &&
                  movie.genres.map((item) => (
                    <li key={item.id} className={css.genreItem}>{item.name}</li>
                  ))}
              </ul>
            </div>
          </div>
          <div>
            <p>Additinal information</p>
            <ul className={css.addInfoList}>
              <li className={css.addInfoItem}>
                <NavLink to="cast" className={buildLinkClass}>Cast</NavLink>
              </li>
              <li>
                <NavLink to="review" className={buildLinkClass}>Review</NavLink>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
