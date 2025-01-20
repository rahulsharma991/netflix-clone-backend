import { Request, Response } from "express";
import { ResponseHandler } from "../helpers/responseHandler";
import { User } from "../models/user.model";
import { ValidateRequestBody } from "../helpers/validateRequestBody";
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateToken";
import {fetchFromTMDB} from "../services/tmdb.service";
export async function signup(req:Request,res:Response):Promise<any> {
    try {
        const {email, password, username} = req.body;
        let isRequestBodyValid = ValidateRequestBody.validate(['email', 'password', 'username'], req);
            if(!isRequestBodyValid) {
                return ResponseHandler.SendResponse(res, 400, 'Invalid payload');
            }
        if(!password) {
           return ResponseHandler.SendResponse(res, 400, 'Password cannot be blank')
        }
        if(!username) {
            return ResponseHandler.SendResponse(res, 400, 'Username cannot be blank')
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
           return ResponseHandler.SendResponse(res, 400, 'Invalid Email');
        }
        const passwordSalt =  bcryptjs.genSaltSync(10);
        const encryptPassword = bcryptjs.hashSync(password, passwordSalt);
        const existingUserByEmail = await User.findOne({email:email});
        const existingUserByUsername = await User.findOne({username:username});
        if(existingUserByEmail && existingUserByUsername) {
            return ResponseHandler.SendResponse(res, 400, 'User already exist');
        }
        if(existingUserByEmail) {
            return ResponseHandler.SendResponse(res, 400, 'Email Already Exist');
        }
        if(existingUserByUsername) {
            return ResponseHandler.SendResponse(res, 400, 'Username Already exist');
        }
        const PROFILE_PICS = ['https://i.pinimg.com/474x/61/54/76/61547625e01d8daf941aae3ffb37f653.jpg', 'https://i.pinimg.com/564x/1b/a2/e6/1ba2e6d1d4874546c70c91f1024e17fb.jpg', 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg']
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
        const newUser =  new User({
            email,
            password: encryptPassword,
            username,
            image,
        });
        await newUser.save();
        ResponseHandler.SendResponse(res, 201, 'User created successfully');
    } catch(err) {
        ResponseHandler.SendResponse(res, 500)
    }
}
export async function login(req:Request, res:Response): Promise<any> {
    try {
        const {email, password} = req.body;
        let isRequestBodyValid = ValidateRequestBody.validate(['email', 'password'], req);
        if(!isRequestBodyValid) {
            return ResponseHandler.SendResponse(res, 400, 'Invalid payload');
        }
        const user = await User.findOne({email});
        if(!user) {
            return ResponseHandler.SendResponse(res, 400, 'Invalid Credentials');
        }
        const passwordMatch = bcryptjs.compareSync(password, user.password);
        if(!passwordMatch) {
            return ResponseHandler.SendResponse(res, 400, 'Invalid Credentials');
        }
        const userId = user._id.toString();
       const token = generateTokenAndSetCookie(userId, res);
        if(token) {
            const data = {
                email: user.email,
                username: user.username,
                image: user.image
            }
            ResponseHandler.SendResponse(res, 200, 'Login successfully', data);
        }
    }catch(err) {
        ResponseHandler.SendResponse(res, 500, "Internal Server Error")
    }
}
 
export async function logout(req:Request, res:Response){
    try {
        res.clearCookie('jwt-netflix');
        ResponseHandler.SendResponse(res, 200, 'Logout successfully');
    } catch(err) {
        ResponseHandler.SendResponse(res, 500)
    }
}

