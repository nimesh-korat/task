const Book = require('../../models/book');

async function SearchBook(req, res) {
    try {

        // Validating required fields
        const { bName } = req.body;

        if (!bName) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        // finding books
        const books = await Book.find({
            name: { $regex: bName, $options: "i" }
        });


        //no books found
        if (!books.length) {
            return res.status(404).json({ success: false, message: "No books found with matching name" });
        }


        // sending response
        return res.status(200).json({ success: true, message: "Books found successfully", data: books });

    } catch (error) {

        // error handling
        console.error("SearchBook.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!!!" });
    }
}

module.exports = { SearchBook };
