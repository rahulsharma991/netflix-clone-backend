import express from "express";
import {
    getMovieDetails,
    getMoviesByCategory,
    getMovieTrailers,
    getSimilarMovies,
    getTrendingMovies
} from "../controllers/movies.controller";

const MovieRouter = express.Router();
MovieRouter.get("/trending", getTrendingMovies);
MovieRouter.get("/trailers/:id", getMovieTrailers);
MovieRouter.get("/details/:id", getMovieDetails);
MovieRouter.get("/similar/:id", getSimilarMovies);
MovieRouter.get('/category/:categoryType', getMoviesByCategory)
export default MovieRouter;