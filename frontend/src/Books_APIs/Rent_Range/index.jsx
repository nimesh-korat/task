import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import BookResults from "../Search_Book/Components/BookResult";
import { useMutation } from "@tanstack/react-query";
import { searchBooksByRentRange } from "../../API_Functions/APIs";
import { toast } from "react-toastify";

function RentRange() {
  const [data, setData] = React.useState({ minRent: "", maxRent: "" });
  const [books, setBooks] = React.useState([]);

  const searchBooksByRentRangeMutation = useMutation({
    mutationKey: ["booksByRentRange"],
    mutationFn: searchBooksByRentRange,
    onSuccess: (data) => {
      setBooks(data.data);
      setData({ minRent: "", maxRent: "" });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    searchBooksByRentRangeMutation.mutate(data);
  };

  return (
    <>
      <h1 className="text-center">Search Books By Rent Range</h1>
      <div className="d-flex justify-content-center">
        <Card style={{ padding: "20px", width: "50rem" }}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formMinRent">
                <Form.Control
                  type="number"
                  name="minRent"
                  min={1}
                  placeholder="Enter Minimum Rent"
                  value={data.minRent}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formMaxRent">
                <Form.Control
                  type="number"
                  name="maxRent"
                  min={1}
                  placeholder="Enter Maximum Rent"
                  value={data.maxRent}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>
              Search
            </Button>
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

export default RentRange;
