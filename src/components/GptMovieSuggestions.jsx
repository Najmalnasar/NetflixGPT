import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gpt = useSelector((store) => store.gpt);
  const { movieNames, movieResults } = gpt;

  if (!movieNames) return null;

  return (
    <div className="text-white bg-black m-4 p-5 bg-opacity-90">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
