import {Request, Response} from "express";
import {ResponseHandler} from "../helpers/responseHandler";
import {fetchFromTMDB} from "../services/tmdb.service";
import {User} from "../models/user.model";
export async function searchPerson(req:Request, res:Response): Promise<any> {
    const { query } = req.params;
    const {page, include_adult} = req.query;
    try {
        const searchData = await fetchFromTMDB('GET', '', `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=${include_adult || false}&language=en-US&page=${page || 1}`);
        const data = {
            content: searchData.results,
            currentPage: searchData.page,
            totalPage: searchData.total_pages,
        }
        if(!searchData?.results.length){
            ResponseHandler.SendResponse(res,200,'No Data Found', data);
            return;
        }
        await User.findByIdAndUpdate((req as any).user._id, {
            $push: {
                searchHistory: {
                    id: searchData.results[0].id,
                    image: searchData.results[0].profile_path,
                    title: searchData.results[0].name,
                    searchType: "person",
                    createdAt: new Date()
                }
            }
        });
        ResponseHandler.SendResponse(res, 200, 'Search Results', data)
    }catch (e) {
        ResponseHandler.SendResponse(res, 500)
    }
}
export async function searchTv(req:Request, res:Response): Promise<any> {
    const { query } = req.params;
    const {page, include_adult} = req.query;
    try {
        const searchData = await fetchFromTMDB('GET', '', `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=${include_adult || false}&language=en-US&page=${page || 1}`);
        const data = {
            content: searchData.results,
            currentPage: searchData.page,
            totalPage: searchData.total_pages,
        }
        if(!searchData?.results.length){
            ResponseHandler.SendResponse(res,200,'No Data Found', data);
            return;
        }
        await User.findByIdAndUpdate((req as any).user._id, {
            $push: {
                searchHistory: {
                    id: searchData.results[0].id,
                    image: searchData.results[0].poster_path,
                    title: searchData.results[0].title,
                    searchType: "tv",
                    createdAt: new Date()
                }
            }
        });
        ResponseHandler.SendResponse(res, 200, 'Search Results', data)
    }catch (e) {
        ResponseHandler.SendResponse(res, 500)
    }
}

export async function searchMovie(req:Request, res:Response): Promise<any> {
    const { query } = req.params;
    const {page, include_adult} = req.query;
    try {
        const searchData = await fetchFromTMDB('GET', '', `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=${include_adult || false}&language=en-US&page=${page || 1}`);
        const data = {
            content: searchData.results,
            currentPage: searchData.page,
            totalPage: searchData.total_pages,
        }
        if(!searchData?.results.length){
            ResponseHandler.SendResponse(res,200,'No Data Found', data);
            return;
        }
        await User.findByIdAndUpdate((req as any).user._id, {
            $push: {
                searchHistory: {
                    id: searchData.results[0].id,
                    image: searchData.results[0].poster_path,
                    title: searchData.results[0].title,
                    searchType: "movie",
                    createdAt: new Date()
                }
            }
        });
        ResponseHandler.SendResponse(res, 200, 'Search Results', data)
    }catch (e) {
        ResponseHandler.SendResponse(res, 500)
    }
}

export async function searchHistory(req:Request, res:Response):Promise<any> {
        try {
            ResponseHandler.SendResponse(res,200, 'Search History', (req as any).user.searchHistory)
        } catch(err) {
            ResponseHandler.SendResponse(res,500)
        }
}
export async function searchHistoryDelete(req:Request, res:Response):Promise<any> {
    const {id} = req.params
    try {
        await User.findByIdAndUpdate((req as any).user._id, {
            $pull: {
                searchHistory: {id:+id}
            }
        });
        ResponseHandler.SendResponse(res,200,'Search History deleted Successfully');
    } catch(err) {
        ResponseHandler.SendResponse(res,500)
    }
}