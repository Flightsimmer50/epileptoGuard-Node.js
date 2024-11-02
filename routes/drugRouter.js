import express from 'express';
import { body } from 'express-validator';
import multer from '../middlewares/multer-config.js';
import { addOnce, getAllDrugs, updateDrug, deleteDrug } from "../controllers/drugController.js";

const router = express.Router();

router
    .route('/')
    .post(multer,
        [body("name").isString()],  
        addOnce)
    .get(getAllDrugs);

    router
    .route("/:name")
    .put(multer,updateDrug)
    .delete(deleteDrug)
    



export default router;