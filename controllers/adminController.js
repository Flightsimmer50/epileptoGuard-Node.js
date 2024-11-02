import Feedback from '../models/feedback.js';
import User from '../models/user.js';
import { sendEmail } from '../utils/sendEmail.js';

export function addFeedback(req, res) {
    Feedback.create({
            userId: req.body.id,
            feedback: req.body.feedback,
        }).then(() => {
            res.status(201).json(req.body.feedback);
        })
        .catch(error => {
            res.status(500).json({ message: error.message });

        })
}

export function getUsers(req, res) {
    User.find({}).then(patients => {
        res.status(200).json({ data: patients });
    }).catch(err => {
        res.status(500).json({ message: err })
    });
};


export function getFeedback(req, res) {
    Feedback.find({ userId: req.params.id }).then(feedback => {
        res.status(200).json({ data: feedback });
    }).catch(err => {
        res.status(500).json({ message: err })
    });
};


export function updateUserRole(req, res) {
    const { id } = req.params;
    const { role } = req.body;

    User.findByIdAndUpdate(id, { role }, { new: true })
        .then(async user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }


            const updatedUser = await user.save();
            //print(updatedUser.email);

            sendEmail({
                to: updatedUser.email,
                subject: 'Epilepto-Guard Modification role',
                text: `
                <body style='font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0;'>
    <table width='100%' cellpadding='0' style='max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
        <tr>
            <td style='padding: 20px;'>
                <h2 style='color: #333;'>Role Update</h2>
                <p>Dear ${updatedUser.firstName} ${updatedUser.lastName},</p>
                <p>Your role has been updated by the admin. Your new role is: ${updatedUser.role}</p>
                <p>Thank you!</p>
                <p><strong>Epilepto Guard Team</strong></p>
            </td>
        </tr>
    </table>
</body>

            `
            });

            res.status(200).json(updatedUser);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}