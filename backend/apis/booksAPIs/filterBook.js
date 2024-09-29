const Book = require('../../models/book');

async function FilterBook(req, res) {
    try {

        // Validating required fields
        const { bName, bCategory, minRent, maxRent } = req.body;

        if (!bName || !bCategory || !minRent || !maxRent) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        // Validating range fields
        const intMinRent = parseInt(minRent);
        const intMaxRent = parseInt(maxRent);

        if (isNaN(intMinRent) || isNaN(intMaxRent)) {
            return res.status(400).json({ success: false, message: "From range and to range must be numbers!" });
        }

        if (intMinRent <= 0 || intMaxRent <= 0) {
            return res.status(400).json({ success: false, message: "From range and to range must be greater than 0!" });
        }

        if (intMinRent > intMaxRent) {
            return res.status(400).json({ success: false, message: "From range cannot be greater than to range!" });
        }

        // Filtering books
        const books = await Book.find({
            name: { $regex: bName, $options: "i" },
            category: { $regex: bCategory, $options: "i" },
            rentPerDay: { $gte: intMinRent, $lte: intMaxRent }
        });

        // No books found
        if (!books.length) {
            return res.status(404).json({ success: false, message: "No books found with matching filters" });
        }

        // Books found
        return res.status(200).json({ success: true, message: "Books found successfully", data: books });

    } catch (error) {
        // Error in filtering books
        console.error("FilterBook.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!!!" });
    }
}

module.exports = { FilterBook };
