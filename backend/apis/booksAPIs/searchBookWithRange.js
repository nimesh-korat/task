const Book = require('../../models/book');

async function SearchBookWithRange(req, res) {
    try {

        // Validating required fields
        const { minRent, maxRent } = req.body;

        if (!minRent || !maxRent) {
            return res.status(400).json({ success: false, message: "Missing required fields!" });
        }

        const intMinRent = parseInt(minRent);
        const intMaxRent = parseInt(maxRent);

        // Validating range fields
        if (isNaN(intMinRent) || isNaN(intMaxRent)) {
            return res.status(400).json({ success: false, message: "From range and to range must be a number!" });
        }

        if (intMinRent <= 0 || intMaxRent <= 0) {
            return res.status(400).json({ success: false, message: "From range and to range must be greater than 0!" });
        }

        if (intMinRent > intMaxRent) {
            return res.status(400).json({ success: false, message: "From range cannot be greater than to range!" });
        }

        // finding books
        const books = await Book.find({
            rentPerDay: { $gte: intMinRent, $lte: intMaxRent }
        });


        //no books found
        if (!books.length) {
            return res.status(404).json({ success: false, message: "No books found with matching range" });
        }

        // sending response
        return res.status(200).json({ success: true, message: "Books found successfully", data: books });

    } catch (error) {

        // error handling
        console.error("SearchBookWithRange.js:", error);
        return res.status(500).json({ success: false, message: "Something went wrong!!!" });
    }
}

module.exports = { SearchBookWithRange };
