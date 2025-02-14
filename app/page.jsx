'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [err , setErr] = useState("");
  const [emailErr , setEmailErr] = useState("");
  const router = useRouter();



  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/sendOtp', { email });

      // console.log("Email", email);

      if (res.status === 200) {
        setOtpSent(true);
      }
    } catch (error) {
      // console.log(error)
      setEmailErr(error.response.data.message || "An unknown error occurred.");
      // console.log("An error occurred while sending OTP:", error);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('/api/verifyOtp', { email, otp });
      if (res.status === 200) {
        router.push('/EmployeeDataBase');
      } 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErr(error.response.data.message || "An unknown error occurred.");
      } else {
        setErr("An unknown error occurred. Please try again.");
      }
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl text-blue-500 font-semibold text-center mb-6">Email Authentication</h1>
        {!otpSent ? (
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-gray-800 p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {emailErr && <p className="text-red-500 mb-2">{emailErr}</p>}
            <button
              onClick={sendOtp}
              className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Send OTP
            </button>
          </div>
        ) : (
          <div>
            <p className="mb-4 text-gray-700">OTP sent to {email}. Please check your Inbox or Spam :</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full text-gray-800 p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {err && <p className="text-red-500 mb-2">{err}</p>}
            <button
              onClick={verifyOtp}
              className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
