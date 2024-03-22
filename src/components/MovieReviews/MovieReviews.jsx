import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import { getMovieReviews } from "../../services/api";
import Loader from "../Loader/Loader";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    if (!movieId) return;

    async function fetchDataByQuery() {
      try {
        setIsLoading(true);
        setIsError(false);

        const resp = await getMovieReviews(movieId);
        if (resp) {
            setReviews(resp);
        } else {
            toast.success("No reviews found!");
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
      {reviews?.length !== 0 && (
        <ul className={css.reviewList}>
          {reviews?.map(item => (
            <li key={item.id} className={css.reviewListItem}>
              <p className={css.reviewAuthor}>
                Author: <span className={css.reviewUsername}>{item.author_details.username}</span>
              </p>
              <p className={css.reviewText}>{item.content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews?.length === 0 && (
        <p>We don&apos;t have any reviews for this movie.</p>
      )}
    </>
  );
};

export default MovieReviews;


