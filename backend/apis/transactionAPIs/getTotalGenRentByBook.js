const Transaction = require('../../models/transaction');
const Book = require('../../models/book');

async function GetTotalGenRentByBook(req, res) {
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

        // Calculating total rent
        const totalRent = transactions.reduce((sum, transaction) => sum + transaction.rentPerDay, 0);

        //! no transactions found
        if (!totalRent) {
            return res.status(404).json({ success: false, message: "No transactions found for this book" });
        }

        // sending response
        return res.status(200).json({ success: true, message: "Transactions Found Successfully", totalRent });

    } catch (error) {

        // error handling
        console.error("GetTotalGenRentByBook.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!!!" });
    }
}

module.exports = { GetTotalGenRentByBook };
