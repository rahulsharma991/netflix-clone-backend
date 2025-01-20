import {ResponseHandler} from "../helpers/responseHandler";
import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload, Secret} from "jsonwebtoken";
import {User} from "../models/user.model";

export const protectRoute = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.cookies['jwt-netflix'];
        if(!token) {
            ResponseHandler.SendResponse(res, 401, 'Unauthorized');
            return;
        }
        // @ts-ignore
        console.log(typeof process.env.JWT_SECRET_KEY);
        let decoded:any;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        } catch(err) {
            ResponseHandler.SendResponse(res, 401, 'Invalid token');
        }
        const user = await User.findById(decoded.token).select("-password");
        if(!user) {
            ResponseHandler.SendResponse(res, 401, 'Invalid token');
        }
        (req as any).user = user;
        next();
    } catch (err:any) {
        ResponseHandler.SendResponse(res,500);
    }
}