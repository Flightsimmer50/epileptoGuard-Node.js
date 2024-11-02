import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import { notFoundError } from "./middlewares/error-handler.js";
import { errorHandler } from "./middlewares/error-handler.js";
import dotenv from "dotenv";
import { authenticateToken } from "./middlewares/user-auth.js";
import userRoutes from "./routes/userRouter.js";
import drugRoutes from "./routes/drugRouter.js";
import sensorRoutes from "./routes/sensorRouter.js";
import seizureRoutes from "./routes/seizureRouter.js";
import postCriseFormDataRoutes from "./routes/postCriseFormDataRoutes.js";
import dailyFormRoute from "./routes/dailyFormRoute.js";
import doctorRoute from "./routes/doctorRoute.js";
import adminRoute from "./routes/adminRoute.js";
import forumRoute from "./routes/forumRoute.js";





dotenv.config();
// Creating an express app
const app = express();

// Setting the port number for the server (default to 9090 if not provided)
const PORT = 9090 || process.env.PORT;

// Specifying the MongoDB database name
const databaseName = 'epilepto-guard';
const db_url_atlas = process.env.DB_URL_ATLAS || 'mongodb+srv://topadmin:topadmin@cluster0.8m1dzlk.mongodb.net/?retryWrites=true&w=majority'


// Enabling debug mode for mongoose
mongoose.set('debug', true);

// Setting the global Promise library
mongoose.Promise = global.Promise;

// Connecting to the MongoDB database
//mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`)
     mongoose.connect(db_url_atlas, { dbName: databaseName })
    .then(() => {
        console.log(`Connected to ${databaseName}`);
    })
    .catch((error) => {
        console.log(error);
    });

// Enabling Cross-Origin Resource Sharing
app.use(cors());

// Using morgan for logging HTTP requests
app.use(morgan('dev'));

// Parsing JSON request bodies
app.use(express.json());

// Parsing URL-encoded request bodies with extended format
app.use(express.urlencoded({ extended: true }));

// Serving static files (images) from the 'public/images' directory
app.use('/img', express.static('public/images'));


app.use('/users', userRoutes);
app.use('/drugs', drugRoutes);
app.use('/seizures', authenticateToken, seizureRoutes);
app.use('/postCriseForm', authenticateToken ,postCriseFormDataRoutes);
app.use('/dailyForm', authenticateToken, dailyFormRoute);
app.use('/sensors', sensorRoutes);
app.use('/doctor', doctorRoute);
app.use('/admin',authenticateToken, adminRoute);
app.use('/description', forumRoute);



// Using custom middleware for handling 404 errors
app.use(notFoundError);

// Using custom middleware for handling general errors
app.use(errorHandler);

// Starting the server and listening on the specified port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});