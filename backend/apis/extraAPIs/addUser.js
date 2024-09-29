const User = require('../../models/user');

async function AddUser(req, res) {
    try {

        // Validate required fields
        const { uName, uDOB, uContactNumber, uAddress, uEmail } = req.body;

        if (!uName || !uDOB || !uContactNumber || !uAddress || !uEmail) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        // Validate dates
        const dateDOB = new Date(uDOB);

        if (isNaN(dateDOB)) {
            return res.status(400).json({ success: false, message: "Date of registration and date of birth must be a valid date!" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ uEmail: uEmail });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists!" });
        }

        // Create a new user instance and save it
        const newUser = new User({
            uName: uName,
            uDOB: dateDOB,
            uContactNumber: uContactNumber,
            uEmail: uEmail,
            uAddress: uAddress,
            uDateofRegistration: new Date(),
        });

        await newUser.save();

        // Return success response
        return res.status(201).json({ success: true, message: "User Added Successfully" });
    } catch (error) {

        // error handling
        console.error("AddUser.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!!!" });
    }
}

module.exports = { AddUser };
