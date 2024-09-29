import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { addBook } from "../../API_Functions/APIs";
import { useNavigate } from "react-router-dom";

function AddBooks() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [bookData, setBookData] = React.useState({
    bName: "",
    bCategory: "",
    bRentPerDay: "",
  });

  const addBookMutation = useMutation({
    mutationKey: ["parts"],
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast.success("Book Added Successfully", {
        onClose: () => {
          navigate("/");
        },
      });
      setBookData({ bName: "", bCategory: "", bRentPerDay: "" });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addBookMutation.mutate(bookData);
  };

  return (
    <>
      <h1 className="text-center">Add Books</h1>
      <div className="d-flex justify-content-center">
        <Card style={{ padding: "20px" }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGridName">
              <Form.Label>Name of The Book</Form.Label>
              <Form.Control
                type="text"
                name="bName"
                value={bookData.bName}
                placeholder="Enter Book Name"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="bCategory"
                value={bookData.bCategory}
                placeholder="Fiction, Romance, etc"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridRent">
              <Form.Label>Rent Price</Form.Label>
              <Form.Control
                type="number"
                name="bRentPerDay"
                value={bookData.bRentPerDay}
                min={1}
                placeholder="Enter Rent Price"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default AddBooks;
