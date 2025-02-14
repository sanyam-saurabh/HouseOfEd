import dbConnect from '../../../lib/dbConnect';
import EmployeeDetails from '../../../models/EmployeeDetails';

export default async function handler(req, res) {
    const { method } = req

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const details = await EmployeeDetails.find({})
                res.status(200).json({ success: true, data: details })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const details = await EmployeeDetails.create(req.body);
                res.status(201).json({ success: true, data: details });
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

        default:
            res.status(400).json({ success: false })
    }
}

