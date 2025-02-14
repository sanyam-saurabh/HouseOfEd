import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email!!!"],
      lowercase: true,
      trim: true,
      match: [
        /^[\w-\.]+@gmail\.com$/,
        "Please provide a valid Gmail address",
      ],
    },
    otp: {
      type: String,
      required: true,
    },
    createdAt: { type: Date, expires: "3m", default: Date.now }, // OTP expires in 2 minutes
  }
);

export default mongoose.models.OTP || mongoose.model("OTP", otpSchema);
