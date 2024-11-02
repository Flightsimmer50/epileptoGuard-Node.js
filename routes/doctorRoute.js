import express from 'express';
import {
    getPatients,
    findPatientById,
    getSensorData
} from '../controllers/doctorController.js';
const router = express.Router();

router.route('/getPatients').get(getPatients);
router.route('/findPatientById').get(findPatientById);
router.route('/getSensorData/:id').get(getSensorData);

export default router;