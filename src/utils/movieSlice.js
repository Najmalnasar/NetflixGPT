import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: { nowPlayingMovies: null, trailerVideo: null },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload
        },
        addTopRatedMovies: (state, action) => {
            state.trailerVideo = action.payload
        },
    },
});

export const { addNowPlayingMovies, addTrailerVideo, addPopularMovies, addTopRatedMovies } = movieSlice.actions

export default movieSlice.reducer