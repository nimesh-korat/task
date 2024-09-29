const Transaction = require('../../models/Transaction');
const Book = require('../../models/book');
const User = require('../../models/User');
const { default: mongoose } = require('mongoose');

async function ReturnBook(req, res) {
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
        const transaction = await Transaction.findOne({
            bookId: book._id,
            userId: user._id,
            status: "BOOK IS ISSUED"
        });

        //no issued transaction found
        if (!transaction) {
            return res.status(404).json({ success: false, message: "No issued transaction found for this book!" });
        }

        // calculating total rent
        const issueDate = new Date(transaction.issueDate);
        const returnDateObj = new Date(); // current date
        const timeDiff = returnDateObj - issueDate;
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        const totalRent = daysDiff * transaction.rentPerDay;

        // updating transaction
        await Transaction.updateOne(
            { _id: transaction._id },
            {
                $set: {
                    returnDate: returnDateObj,
                    totalRent: totalRent,
                    status: "BOOK IS RETURNED"
                }
            }
        );

        // sending response
        return res.status(201).json({ success: true, message: "Book Returned Successfully", totalRent: totalRent });
    } catch (error) {

        // error handling
        console.error("ReturnBook.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!!!" });
    }
}

module.exports = { ReturnBook };
