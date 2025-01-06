import express from 'express';
import connectDB from './db/database';
import AuthRouter from './auth/routes/auth.route';
const app = express();
const port = process.env.PORT || 9000;
app.use(express.json());

app.use('/api/v1/auth', AuthRouter);
const startServer = async() => {
    try {
        console.log('conneting to database....')
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