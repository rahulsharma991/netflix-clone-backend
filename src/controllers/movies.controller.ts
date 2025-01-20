import {Request, Response} from "express";
import {ResponseHandler} from "../helpers/responseHandler";
import {fetchFromTMDB} from "../services/tmdb.service";

export async function getTrendingMovies(req:Request, res:Response): Promise<any>  {
    try {
        const moviesData = await fetchFromTMDB('GET','','https://api.themoviedb.org/3/trending/movie/day?language=en-US');
        const data = {
            content: moviesData.results,
            currentPage: moviesData.page,
            totalPage: moviesData.total_pages,
        }
        ResponseHandler.SendResponse(res, 200, 'Trending movies', data);
    }catch(err){
        ResponseHandler.SendResponse(res, 500)
    }
}

export async function getMovieTrailers(req:Request, res:Response): Promise<any>  {
    const {id} = req.params;
    try {
        const movieTrailers = await fetchFromTMDB('GET', '', `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`)
        const data = {
            content: movieTrailers.results,
            currentPage: movieTrailers.page,
            totalPage: movieTrailers.total_pages,
        }
        ResponseHandler.SendResponse(res, 200, 'Movie Trailers', data);
    } catch (err) {
        ResponseHandler.SendResponse(res, 500)
    }
}

export async function getMovieDetails(req:Request, res:Response): Promise<any>  {
    const {id} = req.params;
    try{
        const movieDetails = await fetchFromTMDB('GET','', `https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        const data = {
            content: movieDetails,
            currentPage: movieDetails.page,
            totalPage: movieDetails.total_pages,
        }
        ResponseHandler.SendResponse(res, 200, 'Movie Details', data);
    } catch (err) {
        ResponseHandler.SendResponse(res, 500)
    }
}
export async function getSimilarMovies(req:Request, res:Response): Promise<any>  {
    const {id} = req.params;
    const { page } = req.query;
    try {
        const movieTrailers = await fetchFromTMDB('GET', '', `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page || 1}`)
        const data = {
            content: movieTrailers.results,
            currentPage: movieTrailers.page,
            totalPage: movieTrailers.total_pages,
        }
        ResponseHandler.SendResponse(res, 200, 'Similar Movies', data);
    } catch (err) {
        ResponseHandler.SendResponse(res, 500)
    }
}

export async function getMoviesByCategory(req:Request, res:Response): Promise<any>  {
    const {categoryType} = req.params;
    const {page}  = req.query;
    try {
        const movieTrailers = await fetchFromTMDB('GET', '', `https://api.themoviedb.org/3/movie/${categoryType}?language=en-US&page=${page || 1}`)
        const data = {
            content: movieTrailers.results,
            currentPage: movieTrailers.page,
            totalPage: movieTrailers.total_pages,
        }
        ResponseHandler.SendResponse(res, 200, 'Movies by category', data);
    } catch (err) {
        ResponseHandler.SendResponse(res, 500)
    }
}