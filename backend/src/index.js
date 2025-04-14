import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app=express();
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    credentials:true // allow session cookie ,headers from browser to pass through
}))
app.use(express.json());
app.use(cookieParser());
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import movieRouter from './routes/movie.route.js';
import tvRouter from './routes/tv.route.js';
import searchRouter from './routes/search.route.js';
import userMiddleware from './middleware/userMiddleware.js';
dotenv.config();


app.use('/api/v1/auth',authRouter);
app.use('/api/v1/movie',userMiddleware,movieRouter);
app.use('/api/v1/tv',userMiddleware,tvRouter)
app.use('/api/v1/search',userMiddleware,searchRouter)



const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})