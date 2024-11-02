import express from 'express';
import { body } from 'express-validator';
import multer from '../middlewares/multer-config-user.js';
import { register, login, sendActivationCode, verifyCode, resetPassword, updateMedicalFile, getMedicalFile, googleSignIn, desactivateAccount, updateProfile } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/user-auth.js';


const router = express.Router();

router.route('/')
    .post([
        body('email').isEmail().withMessage('Please enter a valid email address'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
        body('firstName').isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
        body('lastName').isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
        body('phoneNumber').isLength({ min: 8, max: 8 }).isNumeric().withMessage('Phone number must be at least 8 characters long')
    ], register);

router.route('/updateProfile')
    .put(multer, [
        body('firstName').isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
        body('lastName').isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
        body('phoneNumber').isLength({ min: 8, max: 8 }).isNumeric().withMessage('Phone number must be at least 8 characters long')
    ], authenticateToken, updateProfile);

router.route('/login').post([body("email").isEmpty().withMessage("email is required"), body("password").isEmpty().withMessage("password is required")], login);

router.route('/sendActivationCode').post(sendActivationCode);
router.route('/verifyCode').post(verifyCode);
router.route('/resetPassword').post(resetPassword);
router.route('/updateMedicalFile').put(
    [
        body('weight').isNumeric().withMessage('Weight must be a number').isLength({ min: 2, max: 3 }).withMessage('Weight must be between 2 and 3 characters long'),
        body('height').isNumeric().withMessage('Height must be a number').isLength({ min: 2, max: 3 }).withMessage('Height must be between 2 and 3 characters long'),
        body('birthDate').isDate().withMessage('Birth date must be a valid date').custom((value, { req }) => {
            // Check if birthDate is before current date
            const currentDate = new Date();
            const birthDate = new Date(value);
            if (birthDate >= currentDate) {
                throw new Error('Birth date must be before the current date');
            }
            return true;
        })
    ], authenticateToken, updateMedicalFile);

router.route('/getMedicalFile/:id').get(authenticateToken, getMedicalFile);
router.route('/googleSignIn').post(googleSignIn);
router.route('/desactivateAccount').post(desactivateAccount);





export default router;