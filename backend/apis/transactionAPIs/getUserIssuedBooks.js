const { default: mongoose } = require('mongoose');
const Transaction = require('../../models/Transaction');
const User = require('../../models/User');

async function GetUserTransactionHistory(req, res) {
    try {
        // Validating required fields
        const userId = req.body.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        // if userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: "Invalid User ID!" });
        }

        // Finding user
        const user = await User.findById(userId);

        // No user found
        if (!user) {
            return res.status(404).json({ success: false, message: "No users found with matching id" });
        }

        // Finding transactions for the user
        const transactions = await Transaction.find({ userId: userId }).populate('bookId', 'name rentPerDay');

        // No transactions found
        if (!transactions.length) {
            return res.status(404).json({ success: false, message: "No transactions found for this user" });
        }

        // Initialize an array to hold issued books
        const issuedBooks = [];

        // Loop through each transaction to construct the issuedBooks array
        for (let i = 0; i < transactions.length; i++) {
            const transaction = transactions[i];
            const book = transaction.bookId;

            // Prepare the transaction details
            const issuedBook = {
                bookId: book._id,
                bookName: book.name,
                issueDate: transaction.issueDate,
                returnDate: transaction.returnDate,
                status: transaction.status
            };

            // If the book is returned, calculate the total rent
            if (transaction.returnDate && transaction.status === "BOOK IS RETURNED") {
                const issuedDays = Math.ceil((transaction.returnDate - transaction.issueDate) / (1000 * 60 * 60 * 24));
                const totalRent = issuedDays * book.rentPerDay;

                issuedBook.totalRent = totalRent;
            }

            // Add the book transaction to the issuedBooks array
            issuedBooks.push(issuedBook);
        }

        // Return the response
        return res.status(200).json({
            success: true,
            message: "Books issued to the user found successfully",
            data: issuedBooks
        });

    } catch (error) {
        // Error handling
        console.error("GetUserTransactionHistory.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!!!" });
    }
}

module.exports = { GetUserTransactionHistory };
