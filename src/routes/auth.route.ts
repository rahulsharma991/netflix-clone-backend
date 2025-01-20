import express from "express";
import { login, logout, signup } from "../controllers/auth.controller";
const AuthRouter = express.Router();
AuthRouter.post('/signup', signup);
AuthRouter.post('/login', login);
AuthRouter.get('/logout', logout);
export default AuthRouter;