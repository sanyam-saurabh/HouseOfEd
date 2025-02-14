import mongoose from 'mongoose';

const EmployeeDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the employee's name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide the employee's email"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please provide a valid email address",
    ],
  },
  phone: {
    type: String,
    required: [true, "Please provide the employee's phone number"],
    unique: true,
    trim: true,
    match: [/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"],
  },
});

// Prevent model redefinition in Next.js
export default mongoose.models.EmployeeDetails || mongoose.model('EmployeeDetails', EmployeeDetailsSchema);
