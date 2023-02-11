import React, { useState, useEffect,useCallback } from "react";

import MoviesList from "./components/MoviesList";
import MoviesObj from "./MoviesObj";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);
  const [cancelRetyring, setCancelRetrying] = useState(false);


  const fetchDataHandler =  useCallback( async()=>{
      setError(null);
      setLoading(true);
  
      try {
        const response = await fetch("https://swapi.py4e.com/api/films/");
        if (!response.ok) {
          throw new Error("something went wrong ... Retrying");
        }
        const data = await response.json();
        console.log(data);
        const transformData = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            openingText: movieData.opening_crawl,
          };
        });
        setMovies(transformData);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    
  
  },[])

  useEffect(() => {
    if (error & !cancelRetyring) {
      const intervaler = setInterval(fetchDataHandler, 5000);
      return () => clearInterval(intervaler);
    }
  }, [error, cancelRetyring]);

  useEffect(()=>{
    fetchDataHandler()
  },[fetchDataHandler])

  return (
    <React.Fragment>
      <section>
      <MoviesObj />

        <button onClick={fetchDataHandler}>Fetch Movies</button>
        {error && !cancelRetyring && (
          <button onClick={() => setCancelRetrying(true)}>Cancel</button>
        )}
      </section>
      <section>
        {!loading && movies.length > 0 && <MoviesList movies={movies} />}
        {movies.length == 0 && !error && <p>No response found</p>}
        {loading && <p>Loading..</p>}
        {!loading && error &&  !cancelRetyring && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
