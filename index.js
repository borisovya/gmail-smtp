const nodemailer = require("nodemailer");
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3010

app.use(cors({
        origin: (origin, callback) => {
            callback(null, true)
        },
        credentials: true
    })
)
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

app.get('/', async (req, res) => {
    let {email, number, message} = req.query
    await transporter.sendMail({
        from: '"Someone who needs you 👻"', // sender address
        to: "vladimirborisovalexandrovich@gmail.com", // list of receivers
        subject: "Portfolio page request ✔", // Subject line
        html: `<b> Portfolio page request Congrats! </b>
        <div> From: ${email}</div>
        <div> Phone: ${number}</div>
        <div> Message: ${message}</div>`
    });
    res.send('Message has been sent!')
})

const message = express.Router()
message.post('/s', async (req, res) => {
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
    res.send('Message has been sent!')
})
app.use('/', message)
// app.post('/s', async (req, res) => {
//     let {email, number, message} = req.body
//     await transporter.sendMail({
//         from: '"Someone who needs you 👻"', // sender address
//         to: "vladimirborisovalexandrovich@gmail.com", // list of receivers
//         subject: "Portfolio page request ✔", // Subject line
//         html: `<b> Portfolio page request Congrats! </b>
//         <div> From: ${email}</div>
//         <div> Phone: ${number}</div>
//         <div> Message: ${message}</div>`
//     });
//     res.send('Message has been sent!')
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})