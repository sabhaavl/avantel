const nodemailer =  require('nodemailer');
const conf = require("../conf");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: conf.EMAIL,
        pass: conf.PASSWORD
    }
});

module.exports = async (req, res, next) => {
    try {
        let mailOptions = [
            {
                from: conf.EMAIL,
                to: req.body.email,
                subject: 'Imeds Support',
                text: `Thank you ${req.body.name} for contacting us, we will get back to you soon!!`
            },
            {
                from: conf.EMAIL,
                to: 'marketing@imedsglobal.com',
                subject: `Imeds Contact Us response form of Email: ${req.body.email} `,
                text: `Imeds contact us response form \n Name: ${req.body.name} \n Email: ${req.body.email} \n Phone Number: ${req.body.phoneNo} \n City: ${req.body.city} \n Country: ${req.body.country} \n Company: ${req.body.company} \n Product: ${req.body.product} \n Message: ${req.body.msg}`
            }
        ]
        for(let i=0; i<mailOptions.length; i++) {
            await transporter.sendMail(mailOptions[i])
            .then( results => {
                console.log('Email Sent')
            })
            .catch ( error => {
                console.log("Error:", error);
            })
        }
        return res.status(200).send('Email Sent Successfully');
    } catch (e) {
        console.log(e);
        return res.status(400).send(e.message);
    }
};