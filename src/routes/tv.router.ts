import express from "express";

import MovieRouter from "./movie.router";
import {getSimilarTv, getTrendingTv, getTvByCategory, getTvDetails, getTvTrailers} from "../controllers/tv.controller";

const TvRouter = express.Router();
TvRouter.get("/trending", getTrendingTv);
TvRouter.get("/trailers/:id", getTvTrailers);
TvRouter.get("/details/:id", getTvDetails);
TvRouter.get("/similar/:id", getSimilarTv);
TvRouter.get('/category/:categoryType', getTvByCategory)
export default TvRouter;