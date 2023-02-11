import React, { useRef, useState } from "react";

function MoviesObj() {
    const titleRef = useRef();
    const openingTextRef = useRef();
    const releaseDateRef = useRef();

  const handleSubmit = event => {
    event.preventDefault();
     const newMovie ={
        title : titleRef.current.value,
        openingText : openingTextRef.current.value,
        releaseDate : releaseDateRef.current.value
     }
    console.log("New Movie Object:", newMovie);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          ref={titleRef}
        />
      </div>
      <div>
        <label htmlFor="openingText">Opening Text:</label>
        <input
          type="text"
          id="openingText"
          name="openingText"
          ref={openingTextRef}
        />
      </div>
      <div>
        <label htmlFor="releaseDate">Release Date:</label>
        <input
          type="text"
          id="releaseDate"
          name="releaseDate"
          ref={releaseDateRef}
        />
      </div>
      <button type="submit">Add Movie</button>
    </form>
  );
}

export default MoviesObj;
