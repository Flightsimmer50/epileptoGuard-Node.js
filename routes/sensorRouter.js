import express from 'express';
import { addOne, getAllSensors, getAllSensorsOfAUser } from "../controllers/sensorController.js";

const router = express.Router();

router
    .route('/')
    .post(addOne)
    .get(getAllSensors);

router
    .route("/:user")
    .get(getAllSensorsOfAUser);


export default router;