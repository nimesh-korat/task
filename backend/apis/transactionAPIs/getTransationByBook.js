const Transaction = require('../../models/Transaction');
const Book = require('../../models/book');
const User = require('../../models/User');

async function GetTransactionByBook(req, res) {
    try {

        // Validating required fields
        const { bName } = req.body;

        if (!bName) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        // finding books
        const book = await Book.findOne({ name: bName });

        //no books found
        if (!book) {
            return res.status(404).json({ success: false, message: "No books found with matching name" });
        }

        // finding transactions
        const transactions = await Transaction.find({ bookId: book._id });

        //no transactions found
        if (!transactions.length) {
            return res.status(404).json({ success: false, message: "No transactions found for this book" });
        }

        // calculating total transactions
        const totalTransactions = transactions.length;

        // finding current transaction
        const currentTransaction = await Transaction.findOne({ bookId: book._id, status: "BOOK IS ISSUED" });


        //initializing response
        var response = {
            totalCount: totalTransactions,
            issuedHistory: [],
            currentlyIssued: null
        };


        // for loop for getting issued history
        for (var i = 0; i < transactions.length; i++) {

            // if transaction is not issued then push into issued history
            if (transactions[i].status !== "BOOK IS ISSUED") {

                // finding user
                const user = await User.findById(transactions[i].userId);

                //pushing into issued history
                if (user) {
                    response.issuedHistory.push({
                        userId: transactions[i].userId,
                        userName: user.uName,
                        userDOB: user.uDOB,
                        userContactNumber: user.uContactNumber,
                        userEmail: user.uEmail,
                        userAddress: user.uAddress,
                        userDateofRegistration: user.uDateofRegistration,
                        issueDate: transactions[i].issueDate,
                        returnDate: transactions[i].returnDate
                    });
                }
            }
        }

        // if current transaction is not null then push into currently issued
        if (currentTransaction) {
            const currentUser = await User.findById(currentTransaction.userId);

            //pushing into currently issued
            if (currentUser) {
                response.currentlyIssued = {
                    userId: currentTransaction.userId,
                    userName: currentUser.uName,
                    userDOB: currentUser.uDOB,
                    userContactNumber: currentUser.uContactNumber,
                    userEmail: currentUser.uEmail,
                    userAddress: currentUser.uAddress,
                    userDateofRegistration: currentUser.uDateofRegistration,
                    issueDate: currentTransaction.issueDate
                };
            }
        } else {
            response.currentlyIssued = "The book is not issued at the moment.";
        }

        // sending response
        return res.status(200).json({ success: true, message: "Transactions Found Successfully", data: response });
    } catch (error) {

        // error handling
        console.error("GetTransactionByBook.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!!!" });
    }
}

module.exports = { GetTransactionByBook };
