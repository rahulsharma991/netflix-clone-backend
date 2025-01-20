import jwt from 'jsonwebtoken';
import {  Response } from "express";
export const  generateTokenAndSetCookie =  (userId: string, res:Response) => {
        const token =  jwt.sign({token:userId}, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '30d'
        });
        res.cookie('jwt-netflix', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
       return token;
}