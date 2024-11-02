import express from 'express';
import {
    addFeedback,
    getUsers,
    getFeedback,
    updateUserRole
} from '../controllers/adminController.js';
import user from '../models/user.js';
import { authenticateToken } from '../middlewares/user-auth.js';

const router = express.Router();

function isAdmin(req, res, next) {
    user.findById(req.user.userId).then(user => {
        // Check if the user has the 'admin' role
        if (user.role === 'admin') {
            return next(); // User is an admin, proceed to the next middleware or route handler
        } else {
            return res.status(403).json({ message: 'Unauthorized' }); // User is not an admin, send a forbidden response
        }
    })
    }

router.route('/addFeedback').post(addFeedback);
router.route('/getUsers').get(getUsers);
router.route('/getFeedback/:id').get(getFeedback);
router.route('/users/:id')
    .put(isAdmin,updateUserRole);

export default router;