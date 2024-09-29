const User = require('../../models/user');

async function GetAllUsers(req, res) {
    try {

        // finding users
        const users = await User.find();

        if (!users.length) {
            return res.status(404).json({ success: false, message: "No users found" });
        }

        // sending response
        return res.status(200).json({ success: true, message: "Users found successfully", data: users });

    } catch (error) {

        // error handling
        console.error("GetAllUsers.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!!!" });
    }
}

module.exports = { GetAllUsers };
