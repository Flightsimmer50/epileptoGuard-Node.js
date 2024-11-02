import nodemailer from 'nodemailer';


export function sendEmail(options) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.PASSWORD_EMAIL
        },
    });

    const mailOptions = {
        from: `Epilepto Guard <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.text,
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            //add to logs
            console.log("email sent sucessfully!");
        }
    });


}