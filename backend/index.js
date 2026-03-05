const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "helpusercustomer@gmail.com",
    pass: "APP_PASSWORD_GMAIL"
  }
});

exports.sendVerificationCode = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {

    const email = req.body.email;

    const code = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
      from: "Carueeb <helpusercustomer@gmail.com>",
      to: email,
      subject: "Code de vérification Carueeb",
      text: "Votre code de vérification est : " + code
    };

    try {

      await transporter.sendMail(mailOptions);

      res.json({
        success: true,
        code: code
      });

    } catch (error) {

      res.json({
        success: false
      });

    }

  });
});
