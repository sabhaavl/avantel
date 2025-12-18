const nodemailer = require('nodemailer')
const conf = require('../conf')
// Create a transporter object
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: conf.EMAIL,
    pass: conf.PASSWORD
  }
})

module.exports = (req, res) => {
  try {
    console.log('req.body', req.body)
    console.log('req.file', req.file)

    // if (!req.file) {
    //     return res.status(400).send('No file uploaded.');
    // }
   //  let sendTo = 'hiring.avl@avantel.in';
    let sendTo = 'sabha@simply.science'
    //let ccTo = 'sabha@simply.science';
    // Email options
    let mailOptions = {
      from: conf.EMAIL,
      to: sendTo,
      subject: `New Resume - ${req.body.jobRole}`,
      text: 'Please find attached resume',
      attachments: [
        {
          filename: req.file.filename, // File name to show in email
          path: req.file.path // File path
        }
      ]
    }
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        return res.status(400).send({
          message: 'Error!',
          success: false
        })
      } else {
        console.log('Email sent: ' + info.response)
        return res.status(200).send({
          message: 'Resume uploaded successfully!',
          success: true
        })
      }
    })
  } catch (error) {
    console.log('error in /resume', error)
    return res.status(500).send({
      message: error.message,
      success: false
    })
  }
}
