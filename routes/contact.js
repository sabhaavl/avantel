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
        let sendTo = '';
        if(req.body.enquiryType == 'Marketing') {
            sendTo = 'marketing@avantel.in';
        } else if(req.body.enquiryType == 'Procurement') {
            sendTo = 'materials@avantel.in';
        } else if(req.body.enquiryType == 'Human Resources') {
            sendTo = 'hr@avantel.in';
        } else if(req.body.enquiryType == 'General') {
            //sendTo = 'info@avantel.in';
            sendTo = 'sabha@simply.science';
        } else if(req.body.enquiryType == 'Investors') {
            sendTo = 'investors@avantel.in';
        }
        let mailOptions = [
            {
                from: conf.EMAIL,
                to: req.body.email,
                subject: 'Avantel Support',
                text: `Thank you ${req.body.name} for contacting us, we will get back to you soon!!`
            },
            {
                from: conf.EMAIL,
                to: sendTo,
                subject: `Avantel Contact Us response form of Email: ${req.body.email} `,
                text: `Avantel contact us response form \n Name: ${req.body.name} \n Email: ${req.body.email} \n Phone Number: ${req.body.phone} \n Title: ${req.body.title} \n City: ${req.body.city} \n Country: ${req.body.country} \n Company: ${req.body.company} \n Enquiry Type: ${req.body.enquiryType} \n Message: ${req.body.msg}`
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
        console.log('in mail contact');
        console.log(e);
        return res.status(400).send(e.message);
    }
};