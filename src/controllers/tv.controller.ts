import {Request, Response} from "express";
import {ResponseHandler} from "../helpers/responseHandler";
import {fetchFromTMDB} from "../services/tmdb.service";

export async function getTrendingTv(req:Request, res:Response): Promise<any>  {
    try {
        const tvData = await fetchFromTMDB('GET','','https://api.themoviedb.org/3/trending/tv/day?language=en-US');
        const data = {
            content: tvData.results,
            currentPage: tvData.page,
            totalPage: tvData.total_pages,
        }
        ResponseHandler.SendResponse(res, 200, 'Trending Tv', data);
    }catch(err){
        ResponseHandler.SendResponse(res, 500)
    }
}

export async function getTvTrailers(req:Request, res:Response): Promise<any>  {
    const {id} = req.params;
    try {
        const tvTrailers = await fetchFromTMDB('GET', '', `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`)
        const data = {
            content: tvTrailers.results,
            currentPage: tvTrailers.page,
            totalPage: tvTrailers.total_pages,
        }
        ResponseHandler.SendResponse(res, 200, 'Tv Trailers', data);
    } catch (err) {
        ResponseHandler.SendResponse(res, 500)
    }
}

export async function getTvDetails(req:Request, res:Response): Promise<any>  {
    const {id} = req.params;
    try{
        const tvDetails = await fetchFromTMDB('GET','', `https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        const data = {
            content: tvDetails,
            currentPage: tvDetails.page,
            totalPage: tvDetails.total_pages,
        }
        ResponseHandler.SendResponse(res, 200, 'Tv Details', data);
    } catch (err) {
        ResponseHandler.SendResponse(res, 500)
    }
}
export async function getSimilarTv(req:Request, res:Response): Promise<any>  {
    const {id} = req.params;
    const { page } = req.query;
    try {
        const tvTrailers = await fetchFromTMDB('GET', '', `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page || 1}`)
        const data = {
            content: tvTrailers.results,
            currentPage: tvTrailers.page,
            totalPage: tvTrailers.total_pages,
        }
        ResponseHandler.SendResponse(res, 200, 'Similar Tv', data);
    } catch (err) {
        ResponseHandler.SendResponse(res, 500)
    }
}

export async function getTvByCategory(req:Request, res:Response): Promise<any>  {
    const {categoryType} = req.params;
    const {page}  = req.query;
    try {
        const tvCategory = await fetchFromTMDB('GET', '', `https://api.themoviedb.org/3/tv/${categoryType}?language=en-US&page=${page || 1}`)
        const data = {
            content: tvCategory.results,
            currentPage: tvCategory.page,
            totalPage: tvCategory.total_pages,
        }
        ResponseHandler.SendResponse(res, 200, 'Tv by category', data);
    } catch (err) {
        ResponseHandler.SendResponse(res, 500)
    }
}