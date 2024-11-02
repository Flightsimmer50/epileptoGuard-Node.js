import express from 'express';
import {createDailyForm,getAllDailyForms,getDailyFormById,updateDailyForm,deleteDailyForm} from '../controllers/dailyFormController.js';   


const router = express.Router();

router.post('/',createDailyForm);
router.get('/',getAllDailyForms);
router.get('/:id',getDailyFormById);
router.put('/:id',updateDailyForm);
router.delete('/:id',deleteDailyForm);

export default router;