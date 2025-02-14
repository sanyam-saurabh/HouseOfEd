import dbConnect from '../../../lib/dbConnect';
import EmployeeDetails from '../../../models/EmployeeDetails'

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'PUT':
      try {
        const details = await EmployeeDetails.findByIdAndUpdate(req.query.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!details) {
          return res.status(400).json({ success: false , message : "Data Error Occurred!"});
        }
        res.status(200).json({ success: true, data: details});
      } catch (error) {
        if (error.name === 'ValidationError') {
          const errors = Object.values(error.errors).map(err => err.message);
          res.status(400).json({ success: false, message: errors.join(', ') });
      } else if (error.code === 11000) {
          res.status(400).json({ success: false, message: 'Email or phone number already exists.'});
      } else {
          res.status(400).json({ success: false, message: 'An unknown error occurred.' });
      }
      }
      break;
    case 'DELETE':
      try {
        const deletedetails = await EmployeeDetails.deleteOne({ _id: req.query.id });
        if (!deletedetails) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}