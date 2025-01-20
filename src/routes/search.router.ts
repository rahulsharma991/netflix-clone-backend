import express from "express";
import {
    searchHistory,
    searchHistoryDelete,
    searchMovie,
    searchPerson,
    searchTv
} from "../controllers/search.controller";

const SearchRouter = express.Router();

SearchRouter.get("/person/:query", searchPerson);
SearchRouter.get("/movie/:query", searchMovie);
SearchRouter.get("/tv/:query", searchTv);
SearchRouter.get("/history", searchHistory);
SearchRouter.delete("/history/:id", searchHistoryDelete)
export default SearchRouter;