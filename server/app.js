import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
});
import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';


const app = express();
const isProduction = process.env.NODE_ENV === 'production';

//  Set trust proxy before session middleware
app.set("trust proxy", 1);  // Required for Render & secure cookies

// Middleware setup
const corsSessionOption = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200,
};

const expressSessionOption = {
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGODB_URI,  // Use your MongoDB connection URL
        collectionName: 'sessions', // Optional: Specify collection name
        autoRemove: 'disabled',
    }),
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day expiry time
        secure: isProduction, // Secure only in production
        sameSite: isProduction ? 'none' : 'lax',
    },
};

app.use(cors(corsSessionOption));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(expressSessionOption));


// Debugging Middleware
app.use((req, res, next) => {
    console.log("Cookies Received:", req.cookies);
    console.log("Session ID:", req.sessionID);
    console.log("Session Data:", req.session);
    next();
});


app.get("/" , (req , res) => {
    res.status(200).json({"message" : "Everything working well ! Lets Go !"})
})
export { app };