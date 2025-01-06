import { Request, Response } from "express";
import { ResponseHandler } from "../../helpers/responseHandler";
import { User } from "../../models/user.model";
import { ValidateRequestBody } from "../../helpers/validateRequestBody";
import bcryptjs from 'bcryptjs';
export async function signup(req:Request,res:Response):Promise<any> {
    try {
        const {email, password, username} = req.body;
        let isRequestBodyValid = ValidateRequestBody.validate(['email', 'password', 'username'], req);
            if(!isRequestBodyValid) {
                return ResponseHandler.SendResponse(res, 400, 'Invalid payload');
            }
        if(!req.body.hasOwnProperty('password') && !req.body.hasOwnProperty('email') && !req.body.hasOwnProperty('username')) {
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
export async function login(req:Request, res:Response) {
    res.send('Login')
}
 
export async function logout(req:Request, res:Response){
    res.send('Logout')
}

