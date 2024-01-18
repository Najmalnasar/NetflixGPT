import React, { Fragment } from "react";
import Header from "./Header";
import useNowPlayingMovie from "../hooks/useNowPlaying";
import FirstContainer from "./FirstContainer";
import SecondContainer from "./SecondContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

function Browse() {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovie();
  usePopularMovies();
  useTopRatedMovies();

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <Fragment>
          <FirstContainer />
          <SecondContainer />
        </Fragment>
      )}
    </div>
  );
}

export default Browse;
