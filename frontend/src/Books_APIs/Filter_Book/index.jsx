import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import BookResults from "../Search_Book/Components/BookResult";
import { useMutation } from "@tanstack/react-query";
import { filterBooks } from "../../API_Functions/APIs"; // Assuming this is your filter API function
import { toast } from "react-toastify";

function FilterBook() {
  const [filterData, setFilterData] = React.useState({
    bName: "",
    bCategory: "",
    minRent: "",
    maxRent: "",
  });
  const [filteredBooks, setFilteredBooks] = React.useState([]);

  const filterBooksMutation = useMutation({
    mutationKey: ["filteredBooks"],
    mutationFn: filterBooks,
    onSuccess: (data) => {
      setFilteredBooks(data.data);
      setFilterData({ bName: "", bCategory: "", minRent: "", maxRent: "", });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filterBooksMutation.mutate(filterData);
  };

  return (
    <>
      <h1 className="text-center">Filter Books</h1>
      <div className="d-flex justify-content-center">
        <Card style={{ padding: "20px", width: "50rem" }}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formBookName">
                <Form.Control
                  type="text"
                  name="bName"
                  placeholder="Enter Book Name"
                  value={filterData.bName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formBookCategory">
                <Form.Control
                  type="text"
                  name="bCategory"
                  placeholder="Enter Book Category"
                  value={filterData.bCategory}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formBookRent">
                <Form.Control
                  type="number"
                  name="minRent"
                  min={1}
                  placeholder="Enter Minimum Rent"
                  value={filterData.minRent}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formBookRent">
                <Form.Control
                  type="number"
                  name="maxRent"
                  min={1}
                  placeholder="Enter Maximum Rent"
                  value={filterData.maxRent}
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

      {/* Render filtered book results */}
      {filteredBooks.length > 0 &&
        filteredBooks.map((book) => (
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

export default FilterBook;
