import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import BookResults from "./Components/BookResult";
import { useMutation } from "@tanstack/react-query";
import { searchBook } from "../../API_Functions/APIs";
import { toast } from "react-toastify";

function SearchBook() {
  const [bName, setBName] = React.useState("");
  const [books, setBooks] = React.useState([]);

  const searchBookMutation = useMutation({
    mutationKey: ["books"],
    mutationFn: searchBook,
    onSuccess: (data) => {
      setBooks(data.data);
      setBName("");
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleChange = (e) => {
    setBName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bName.trim()) {
      searchBookMutation.mutate({ bName: bName });
    } else {
      alert("Please enter a book name");
    }
  };

  return (
    <>
      <h1 className="text-center">Search Books</h1>
      <div className="d-flex justify-content-center">
        <Card style={{ padding: "20px", width: "50rem" }}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} xs={9} controlId="formGridBookName">
                <Form.Control
                  type="text"
                  placeholder="Enter Book Name"
                  value={bName}
                  name="bName"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Col xs={3}>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ width: "100%" }}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
      {books.length > 0 &&
        books.map((book) => (
          <BookResults
            key={book._id}
            name={book.name}
            category={book.category}
            rentPerDay={book.rentPerDay}
          />
        ))}
    </>
  );
}

export default SearchBook;
