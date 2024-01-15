import React from "react";
import Header from "./Header";
import useNowPlayingMovie from "../hooks/useNowPlaying";
import FirstContainer from "./FirstContainer";
import SecondContainer from "./SecondContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";

function Browse() {
  useNowPlayingMovie();
  usePopularMovies();
  useTopRatedMovies();

  return (
    <div>
      <Header />
      <FirstContainer />
      <SecondContainer />
    </div>
  );
}

export default Browse;
