const express = require("express")
const env = require("dotenv")
const cors = require("cors")
const nodemailer = require("nodemailer")
const app = express();

env.config();
const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

app.get('/', (req, res)=>{
    transporter.sendMail({
        from: 'John Doe <'+process.env.EMAIL + '>',
        to: 'godfreydhl@gmail.com', 
        subject: 'Testing nidemailer',
        html: `<h1>Heading</h1>
        <p> This is a nodemailer email. Well done G</p>`,
        attachments:[
            {
                filename:'invoice.pdf',
                path:'shop.pdf'
            }
        ]
    }, (err, info)=>{
        if(err) throw err;
        res.json({status:info.response})
    })
    
})

app.listen(7000, ()=>{
    console.log('Running on 7000')
})