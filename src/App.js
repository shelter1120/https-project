import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading,setLoading] = useState()

   async function fetchDataHandler(){
      const response = await fetch("https://swapi.py4e.com/api/films/")
      const data = await  response.json();
      console.log(data)
        const transformData = data.results.map((movieData) => {
          return {
            id : movieData.episode_id,
            title: movieData.title,
            releaseDate: movieData.release_date,
            openingText: movieData.opening_crawl,
          };
        });
        setMovies(transformData);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchDataHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
