const express = require('express')
const app = express()

"use strict";
const nodemailer = require("nodemailer");

// async function main() {
// let testAccount = await nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    service: 'gmail',
    // secure: false,
    auth: {
        user: 'email@gmail.com',
        pass: '.....',
    },
});

const maillist = "email1@gmail.com, email2@gmail.com,email3@gmail.com"

// let info = await transporter.sendMail({
const info = transporter.sendMail({
    from: 'email@gmail.com',
    to: maillist,
    subject: "Hello ✔",
    text: "Hello world?",
    html: "<b>Hello world?</b>"
}
    // , (err, info) => {
    //     if (err) return console.log(err);
    //     console.log("Message sent: %s", info.messageId);
    //     msg.transport.close()
    // }
);

console.log("Message sent: %s", info.messageId);

console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

// }

// main().catch(console.error);