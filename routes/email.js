const express = require('express')
const router = express.Router()
require('dotenv').config()
const nodemailer = require('nodemailer')


router.post('/', async(req, res)=> {
    const{email, phone, addres, total, products} = req.body
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD 
        }
    })

    let mailOptions = { 
        from: process.env.EMAIL,
        to: email,
        subject: 'web-shop',
        text: 
        `Your bill for purches in web-shop is  ${total}$, it will be delivered to ${addres} addres.
        If ther are any problems with your shipment we will contact you on phone-number ${phone}.
        Thank you for trusting us, all the best!`,
        template: 'index'
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error occurs')
        }
        return log('Email sent!!!')
    })
})


module.exports = router