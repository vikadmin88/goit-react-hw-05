import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { getMoviesByTrend } from '../../services/api.js';
import Loader from '../../components/Loader/Loader';
import MoviesList from '../../components/MoviesList/MoviesList.jsx';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {

        async function fetchDataByQuery() {
            try {
                setIsLoading(true);
                setIsError(false);

                const resp = await getMoviesByTrend();
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
    }, []);

    return (
        <>
            {!isError && isLoading && <Loader />}
            {movies && <MoviesList movies={movies} />}
        </>
    );
};



export default HomePage