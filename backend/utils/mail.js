const nodemailer = require("nodemailer");
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.email,
        pass: process.env.password
    }
});

exports.sendMail = async (data) => {
    try {
        let Options = {
            from: process.env.from_email,
            to: data['to'],
            subject: data['subject'],
            text: data['text']
        }
        let resultData = await transporter.sendMail(Options).catch((error) => {
            throw error;
        })
        console.log(resultData);
    } catch (error) {
        throw error;
    }
}