const Transaction = require('../../models/Transaction');
const Book = require('../../models/book');
const User = require('../../models/User');
const { default: mongoose } = require('mongoose');

async function IssueBook(req, res) {
    try {

        // Validating required fields
        const { bName, userId } = req.body;

        if (!bName || !userId) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        // finding books
        const book = await Book.findOne({ name: bName });


        //no books found
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found!" });
        }

        // if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid User ID!" });
        }

        // finding user
        const user = await User.findById(userId);

        //no user found
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }

        // checking if book is already issued
        const isIssued = await Transaction.findOne({
            bookId: book._id,
            status: "BOOK IS ISSUED"
        });

        // book is already issued
        if (isIssued) {
            return res.status(400).json({ success: false, message: "Book already issued to someone!" });
        }

        // creating transaction
        const newTransaction = new Transaction({
            bookId: book._id,
            userId: user._id,
            issueDate: new Date(),
            rentPerDay: book.rentPerDay,
            totalRent: 0,
            returnDate: null,
            status: "BOOK IS ISSUED"
        });

        await newTransaction.save();

        // returning response
        return res.status(201).json({ success: true, message: "Book Issued Successfully" });
    } catch (error) {

        // error handling
        console.error("IssueBook.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!!!" });
    }
}

module.exports = { IssueBook };
