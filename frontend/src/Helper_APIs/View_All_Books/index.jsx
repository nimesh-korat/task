import React from "react";
import Books from "./Components/Books";
import { fetchBooks } from "../../API_Functions/APIs";
import { useQuery } from "@tanstack/react-query";

function ViewAllBooks() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  if (isLoading) {
    return <div className="text-center mt-5 h4">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center mt-5 h4">Error fetching books</div>;
  }

  const books = data?.data || [];

  return (
    <>
      <h1 className="text-center">All Books</h1>
      {books.length > 0 ? (
        books.map((book) => (
          <Books
            key={book._id}
            bookId={book._id}
            bookName={book.name}
            bookCategory={book.category}
            bookPrice={book.rentPerDay}
          />
        ))
      ) : (
        <p>No books found</p>
      )}
    </>
  );
}

export default ViewAllBooks;
