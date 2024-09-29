import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Home";
import AddBooks from "./Extra_APIs/Add_Books";
import AddUsers from "./Extra_APIs/Add_Users";
import SearchBook from "./Books_APIs/Search_Book";
import RentRange from "./Books_APIs/Rent_Range";
import FilterBook from "./Books_APIs/Filter_Book";
import IssueBook from "./Transaction_APIs/Issue_Book";
import ReturnBook from "./Transaction_APIs/Return_Book";
import BookHistory from "./Transaction_APIs/Book_History";
import TotalRentByBook from "./Transaction_APIs/Total_Rent_BY_Book";
import UserHistory from "./Transaction_APIs/User_History";
import HistoryByDateRange from "./Transaction_APIs/History_By_DateRange";
import ViewAllBooks from "./Helper_APIs/View_All_Books";
import ViewAllUsers from "./Helper_APIs/View_All_Users";
function App() {
  return (
    <>
      <ToastContainer autoClose={1500} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="*"
            element={<div className="text-center mt-5 h3">Page Not Found</div>}
          />
          <Route path="/addbook" element={<AddBooks />} />
          <Route path="/adduser" element={<AddUsers />} />
          <Route path="/searchbook" element={<SearchBook />} />
          <Route path="/searchbookwithrange" element={<RentRange />} />
          <Route path="/filterbook" element={<FilterBook />} />
          <Route path="/issuebook" element={<IssueBook />} />
          <Route path="/returnbook" element={<ReturnBook />} />
          <Route path="/transactionofbooks" element={<BookHistory />} />
          <Route path="/totalrentofbook" element={<TotalRentByBook />} />
          <Route path="/transactionofusers" element={<UserHistory />} />
          <Route
            path="/transactionbydaterange"
            element={<HistoryByDateRange />}
          />
          <Route path="/viewallbooks" element={<ViewAllBooks />} />
          <Route path="/viewallusers" element={<ViewAllUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
