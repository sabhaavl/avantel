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
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).send({
        success: false,
        message: "Resume file is required",
      });
    }

     let sendTo = 'hiring.avl@avantel.in';
     //let sendTo = 'sabha@simply.science';

    let mailOptions = {
      from: conf.EMAIL,
      to: sendTo,
      subject: `New Resume - ${req.body.jobRole}`,
      text: `
A new candidate has applied for the job.

Name: ${req.body.name}
Phone: ${req.body.phone}
Email: ${req.body.email}

Current CTC: ${req.body.currentCTC}
Expected CTC: ${req.body.expectedCTC}
Notice Period: ${req.body.noticePeriod}

Job Role:
${req.body.jobRole}

Resume attached.
      `,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("MAIL ERROR:", error);
        return res.status(400).send({ success: false });
      }

      return res.status(200).send({
        success: true,
        message: "Resume uploaded successfully!",
      });
    });
  } catch (error) {
    console.log("ERROR:", error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

