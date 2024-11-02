import express from 'express';
import { createPostCriseFormData, getPostCriseFormDataByCriseId, updatePostCriseFormData } from '../controllers/postCriseFormDataController.js';



const router = express.Router();

router.post('/',createPostCriseFormData);
router.get('/',getPostCriseFormDataByCriseId);
router.put('/',updatePostCriseFormData);
//router.post('/updateFormSubmittedStatus/:formId', updateFormSubmittedStatus);

export default router; 