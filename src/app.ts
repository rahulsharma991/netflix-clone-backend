import express from 'express';
import connectDB from './db/database';
import AuthRouter from './routes/auth.route';
import MovieRouter from "./routes/movie.router";
import TvRouter from "./routes/tv.router";
import {protectRoute} from "./middleware/protectRoute";
import cookieParser from 'cookie-parser'
import SearchRouter from "./routes/search.router";
const app = express();
const port = process.env.PORT || 9000;
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/movie',protectRoute, MovieRouter);
app.use('/api/v1/tv',protectRoute, TvRouter);
app.use('/api/v1/search',protectRoute, SearchRouter);
const startServer = async() => {
    try {
        console.log('connecting to database....')
        await connectDB();
        app.listen(port , () => {
            console.log('Connected successfully', port)
        });
    } catch(err) {
        console.error('Error while starting the server',err)
        process.exit(1);
    }
}
startServer();
//signup if user exists then send user already exist
//login in with JWT token