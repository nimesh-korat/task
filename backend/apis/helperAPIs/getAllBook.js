const Book = require('../../models/book');

async function GetAllBooks(req, res) {
    try {

        // finding books
        const books = await Book.find();

        if (!books.length) {
            return res.status(404).json({ success: false, message: "No books found" });
        }

        // sending response
        return res.status(200).json({ success: true, message: "Books found successfully", data: books });

    } catch (error) {

        // error handling
        console.error("GetAllBooks.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!!!" });
    }
}

module.exports = { GetAllBooks };
