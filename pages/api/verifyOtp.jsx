import optschema from '../../models/otpschema';
import dbConnect from '../../lib/db_auth_Connect';

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
  
    switch (method) {
      case 'POST':
        try {
          const { email, otp } = req.body;
  
          const otpRecord = await optschema.findOne({ email,otp });
  
          if(otpRecord){
            res.status(200).json({ success: true, message: "OTP verified successfully!" });
          }else {
            res.status(400).json({ success: false, message: "Invalid OTP!" });
          }
        } catch (error) {
          res.status(500).json({ success: false, message: "Error verifying OTP" });
        }
        break;
  
      default:
        res.status(400).json({ success: false, message: "Invalid HTTP method" });
    }
  }
  