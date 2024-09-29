const Book = require('../../models/book');

async function AddBook(req, res) {
    try {

        // Validate required fields
        const { bName, bCategory, bRentPerDay } = req.body;

        if (!bName || !bCategory || !bRentPerDay) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        const intbRentPerDay = parseInt(bRentPerDay);

        // Validate rentPerDay
        if (isNaN(intbRentPerDay) || intbRentPerDay <= 0) {
            return res.status(400).json({ success: false, message: "Rent per day must be a number greater than 0!" });
        }

        // Check if the book already exists
        const existingBook = await Book.findOne({ name: bName });
        if (existingBook) {
            return res.status(400).json({ success: false, message: "Book already exists!" });
        }

        // Create a new book instance and save it
        const newBook = new Book({
            name: bName,
            category: bCategory,
            rentPerDay: intbRentPerDay,
        });

        await newBook.save();

        // Return success response
        return res.status(201).json({ success: true, message: "Book Added Successfully" });
    } catch (error) {

        // error handling
        console.error("AddBook.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!!!" });
    }
}

module.exports = { AddBook };
