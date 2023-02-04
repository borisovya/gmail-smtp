const nodemailer = require("nodemailer");
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3010

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let login = process.env.LOGIN || '--'
let pass = process.env.PASS || '--'

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: login,
        pass: pass,
    },
});

app.get('/', (req, res) => {
    res.send('Server has been started!')
})

app.post('/s', async function (req, res) {
    let {email, number, message} = req.body
    await transporter.sendMail({
        from: '"Someone who needs you 👻"', // sender address
        to: "vladimirborisovalexandrovich@gmail.com", // list of receivers
        subject: "Portfolio page request ✔", // Subject line
        html: `<b> Portfolio page request Congrats! </b>
        <div> From: ${email}</div>
        <div> Phone: ${number}</div>
        <div> Message: ${message}</div>`
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})