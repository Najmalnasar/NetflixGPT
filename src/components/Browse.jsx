import React from "react";
import Header from "./Header";
import useNowPlayingMovie from "../hooks/useNowPlaying";
import FirstContainer from "./FirstContainer";
import SecondContainer from "./SecondContainer";

function Browse() {
  useNowPlayingMovie();

  return (
    <div>
      <Header />
      <FirstContainer />
      <SecondContainer />
    </div>
  );
}

export default Browse;
