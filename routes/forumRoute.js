import express from 'express';
import { body } from 'express-validator';
import multer from '../middlewares/multer-config.js';
import { addOnce, getAllFeedbacks, updateFeedback, deleteFeedback } from "../controllers/forumController.js";

const router = express.Router();

router
    .route('/')
    .post(multer,
        [body("description").isString()],  
        addOnce)
    .get(getAllFeedbacks);

    router
    .route("/:description")
    .put(multer,updateFeedback)
    .delete(deleteFeedback)
    



export default router;