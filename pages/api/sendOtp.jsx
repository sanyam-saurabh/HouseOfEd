import sgMail from '@sendgrid/mail';
import optschema from '../../models/otpschema';
import dbConnect from '../../lib/db_auth_Connect';



export default async function handler(req, res) {
  const { method } = req;
  // Connect to the database
  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const { email } = req.body;


        const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP


        await optschema.create({ email, otp });

        // Prepare email data
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: email,
          from: process.env.EMAIL_PRIV, // Use your verified SendGrid email
          subject: 'Your OTP Code',
          html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        };


        sgMail
          .send(msg)
          .then(() => {
            console.log('✅ Test email sent successfully!!!!!');
          })
          .catch((error) => {
            console.error('❌ Error sending email:', error.response.body);
          });

        res.status(200).json({ success: true });

      } catch (error) {
        if (error.name === "ValidationError") {
          // console.log("Validation Error",error.message)
          const errors = Object.values(error.errors).map(err => err.message);
          res.status(400).json({ success: false, message: errors.join(', ') });
        } else {
          res.status(500).json({ success: false, message: "Error sending OTP" });
        }

      }
      break;

    default:
      res.status(400).json({ success: false, message: "Invalid HTTP method" });
  }
}

