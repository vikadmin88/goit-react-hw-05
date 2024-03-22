import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import { getMovieCast } from "../../services/api";
import Loader from "../Loader/Loader";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();
  const defImg = 'https://cdn-icons-png.flaticon.com/512/2922/2922506.png';
  
  useEffect(() => {
    if (!movieId) return;

    async function fetchDataByQuery() {
      try {
        setIsLoading(true);
        setIsError(false);

        const resp = await getMovieCast(movieId);
        if (resp) {
          setCast(resp);
        } else {
          toast.success("No cast found!");
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
      {!isError && isLoading && <Loader />}
      {cast?.length !== 0 && (
        <ul className={css.castList}>
          {cast.map(actor => (
            <li key={actor.id} className={css.castListItem}>
              <img
                src={actor.profile_path ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` : defImg}
                alt={actor.name}
                width={240}
              />
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )}
      {cast?.length === 0 && (
        <p>We don&apos;t have any information about cast</p>
      )}
    </>
  );
};

export default MovieCast;