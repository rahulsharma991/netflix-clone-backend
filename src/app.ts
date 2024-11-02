import express from 'express';
import connectDB from './db/database';
const app = express();
const port = process.env.PORT || 9000;

const startServer = async() => {
    try {
        await connectDB();
        app.listen(port , () => {
            console.log('Connected succesfully', port)
        });
    } catch(err) {
        console.error('Error while starting the server',err)
        process.exit(1);
    }
}

startServer();
//signup if user exists then send user already exist
//login in with JWT token