import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import SearchForm from '../../components/SearchForm/SearchForm';
import { getMoviesByQuery } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import MovieList from '../../components/MovieList/MovieList';
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    async function fetchDataByQuery() {
      try {
        setIsLoading(true);
        setIsError(false);
  
        const resp = await getMoviesByQuery(query);
        if (resp) {
            setMovies(resp);
          } else {
            toast.success('No movies found!');
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
  }, [query]);

  const onSearchHandler = query => {
    setSearchParams(query ? { query } : {});
  };


  return (
    <div className={css.pageContainer}>
      <SearchForm onSearchHandler={onSearchHandler} />
      {!isError && isLoading && <Loader />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
