import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import MoviesObj from "./MoviesObj";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);
  const [cancelRetyring, setCancelRetrying] = useState(false);

  const fetchDataHandler = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "https://react-http-1fabf-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("something went wrong ... Retrying");
      }
      const data = await response.json();
      console.log(data);

      const dataFromFirebaseApi = [];

      for (const key in data) {
        dataFromFirebaseApi.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }

      setMovies(dataFromFirebaseApi);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-http-1fabf-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application.json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    if (error & !cancelRetyring) {
      const intervaler = setInterval(fetchDataHandler, 5000);
      return () => clearInterval(intervaler);
    }
  }, [error, cancelRetyring]);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  return (
    <React.Fragment>
      <section>
        <MoviesObj onAddMovie={addMovieHandler} />

        <button onClick={fetchDataHandler}>Fetch Movies</button>
        {error && !cancelRetyring && (
          <button onClick={() => setCancelRetrying(true)}>Cancel</button>
        )}
      </section>
      <section>
        {!loading && movies.length > 0 && <MoviesList movies={movies} />}
        {movies.length == 0 && !error && <p>No response found</p>}
        {loading && <p>Loading..</p>}
        {!loading && error && !cancelRetyring && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
