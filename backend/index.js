const express = require("express");
const connectDB = require("./db/dbConnect");
const cors = require("cors");
const { AddBook } = require("./apis/extraAPIs/addBook");
const { AddUser } = require("./apis/extraAPIs/addUser");
const { SearchBook } = require("./apis/booksAPIs/searchBook");
const { SearchBookWithRange } = require("./apis/booksAPIs/searchBookWithRange");
const { FilterBook } = require("./apis/booksAPIs/filterBook");
const { IssueBook } = require("./apis//transactionAPIs/issueBook");
const { ReturnBook } = require("./apis/transactionAPIs/returnBook");
const { GetTransactionByBook } = require("./apis/transactionAPIs/getTransationByBook");
const { GetTotalGenRentByBook } = require("./apis/transactionAPIs/getTotalGenRentByBook");
const { GetUserTransactionHistory } = require("./apis/transactionAPIs/getUserIssuedBooks");
const { GetTransactionHistoryByDate } = require("./apis/transactionAPIs/getTransactionHistoryByDate");
const { GetAllBooks } = require("./apis/helperAPIs/getAllBook");
const { GetAllUsers } = require("./apis/helperAPIs/getAllUsers");

require('dotenv').config();

//?initialize app and PORT
const app = express();
const PORT = process.env.PORT || 5000;

//?Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

//?callback to connect MongoDB
connectDB();

//!apis
//?Helper apis
app.get("/fetchBooks", GetAllBooks);
app.get("/fetchUsers", GetAllUsers);

//?Books and Users
app.post("/addBook", AddBook);
app.post("/addUser", AddUser);
app.post("/searchBook", SearchBook);
app.post("/searchBookWithRange", SearchBookWithRange);
app.post("/filterBooks", FilterBook);

//?Transactions
app.post("/issueBook", IssueBook);
app.post("/returnBook", ReturnBook);
app.post("/getTransactionByBook", GetTransactionByBook);
app.post("/getTotalGenRentByBook", GetTotalGenRentByBook);
app.post("/getUserIssuedBooks", GetUserTransactionHistory);
app.post("/getTransactionHistoryByDate", GetTransactionHistoryByDate);


//?activate server
app.listen(PORT, () => {
    console.log("Server Started on port: ", PORT);
});