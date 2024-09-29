const Transaction = require('../../models/transaction');
const Book = require('../../models/book');
const User = require('../../models/user');

async function GetTransactionHistoryByDate(req, res) {
    try {

        // Validating required fields
        const { fromDate, toDate } = req.body;

        if (!fromDate || !toDate) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        // Validating dates
        const fromDateObj = new Date(fromDate);
        const toDateObj = new Date(toDate);
        toDateObj.setHours(23, 59, 59, 999);

        if (fromDateObj > toDateObj) {
            return res.status(400).json({ success: false, message: "From date should be less than to date" });
        }

        // finding transactions
        const transactions = await Transaction.find({
            issueDate: { $gte: fromDateObj, $lte: toDateObj },
        });

        //no transactions found
        if (!transactions.length) {
            return res.status(404).json({ success: false, message: "No transactions found for this date range" });
        }


        //initialize an array to hold issued books
        const issuedBooks = [];

        // Looping for each transaction to construct the issuedBooks array
        for (const transaction of transactions) {
            const book = await Book.findById(transaction.bookId);
            const user = await User.findById(transaction.userId);

            //checking if book and user exist
            if (book && user) {
                issuedBooks.push({
                    bookId: book._id,
                    bookName: book.name,
                    issueDate: transaction.issueDate,
                    returnDate: transaction.returnDate,
                    userId: user._id,
                    userName: user.uName,
                    userEmail: user.uEmail,
                    userContactNumber: user.uContactNumber,
                    userDOB: user.uDOB
                });
            }
        }


        // sending response
        return res.status(200).json({
            success: true,
            message: "Transactions history found successfully",
            data: issuedBooks
        });

    } catch (error) {

        // error handling
        console.error("GetTransactionHistoryByDate.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!!!" });
    }
}

module.exports = { GetTransactionHistoryByDate };
