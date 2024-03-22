import { useRef, useEffect, useState } from "react";
import { NavLink, Link, Outlet, useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getMovieById } from "../../services/api";
import Loader from "../../components/Loader/Loader";

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
    <>
      <Link to={goBackLink.current}> &lt;&lt; Go Back</Link>
      {!isError && isLoading && <Loader />}
      <div>
        <img
          src={
            movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defImg
          }
          width={300}
          alt="movie poster"
        />
        <div>
          <h1>
            {movie.title}{" "}
            {movie.release_date ? `(${movie.release_date.substring(0, 4)})` : ""}
          </h1>
          <p>User Score: {movie.vote_average ? Math.round(movie.vote_average * 10) : 0}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres && movie.genres.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <p>Additinal information</p>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="review">Review</NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
