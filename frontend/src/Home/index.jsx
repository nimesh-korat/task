import React from "react";
import cardButton from "./Components/CardButton";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container mt-2 mb-5 text-center">
        <h1>Edunova Tasks</h1>
        <h5>Helper APIs</h5>
        <div className=" d-flex justify-content-center gap-5 ">
          {cardButton(
            "View All Books",
            "This button is used to get all book details.",
            () => {
              navigate("/viewallbooks");
            }
          )}
          {cardButton(
            "View All Users",
            "This button is used to get all user details.",
            () => {
              navigate("/viewallusers");
            }
          )}
        </div>

        <h5 className="mt-1">Books Related APIs</h5>
        <div className=" d-flex justify-content-center gap-5">
          {cardButton(
            "Search Book",
            "This button is used to search for a book.",
            () => {
              navigate("/searchbook");
            }
          )}
          {cardButton(
            "Rent Range",
            "This button is used to search the book by the rent price range.",
            () => {
              navigate("/searchbookwithrange");
            }
          )}

          {cardButton(
            "Filter Book",
            "This button is used to filter the book by category, name and rent per day.",
            () => {
              navigate("/filterbook");
            }
          )}
        </div>

        <h5 className="mt-1">Transaction Related APIs</h5>
        <div className=" d-flex justify-content-center gap-5">
          {cardButton(
            "Issue Book",
            "This button is used to issue the book to user.",
            () => {
              navigate("/issuebook");
            }
          )}
          {cardButton(
            "Return Book",
            "This button is used to return the book.",
            () => {
              navigate("/returnbook");
            }
          )}
          {cardButton(
            "Transaction of books",
            "This button is used to search the transaction history of books.",
            () => {
              navigate("/transactionofbooks");
            }
          )}
        </div>
        <div className=" d-flex justify-content-center gap-5">
          {cardButton(
            "Total Rent of Book",
            "This button is used to find total revenue generated from books.",
            () => {
              navigate("/totalrentofbook");
            }
          )}
          {cardButton(
            "Transaction of users",
            "This button is used to find transaction history of users.",
            () => {
              navigate("/transactionofusers");
            }
          )}
          {cardButton(
            "Transaction by Date Range",
            "This button is used to find transaction history by date range.",
            () => {
              navigate("/transactionbydaterange");
            }
          )}
        </div>

        <h5 className="mt-1">Extra APIs</h5>
        <div className=" d-flex justify-content-center gap-5">
          {cardButton(
            "Add User",
            "This button is used to add a new user.",
            () => {
              navigate("/adduser");
            }
          )}
          {cardButton(
            "Add Book",
            "This button is used to add a new book.",
            () => {
              navigate("/addbook");
            }
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
