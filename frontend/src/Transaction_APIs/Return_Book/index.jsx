import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { returnBook } from "../../API_Functions/APIs";
import { toast } from "react-toastify";

function ReturnBook() {
  const [returnData, setReturnData] = React.useState({
    bName: "",
    userId: "",
  });
  const [totalRent, setTotalRent] = React.useState(null);

  const returnBookMutation = useMutation({
    mutationKey: ["returnBook"],
    mutationFn: returnBook,
    onSuccess: (data) => {
      setTotalRent(data.totalRent);
      toast.success("Book returned successfully");
      setReturnData({ bName: "", userId: "" });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReturnData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    returnBookMutation.mutate(returnData);
  };

  return (
    <>
      <h1 className="text-center">Return Book</h1>
      <div className="d-flex justify-content-center">
        <Card style={{ padding: "20px", width: "50rem" }}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formbName">
                <Form.Control
                  type="text"
                  name="bName"
                  placeholder="Enter Full Book Name"
                  value={returnData.bName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formUserId">
                <Form.Control
                  type="text"
                  name="userId"
                  placeholder="Enter User ID"
                  value={returnData.userId}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form>

          {totalRent !== null && (
            <h4 style={{ textAlign: "center", marginTop: "20px" }}>
              The total rent is Rs. {totalRent}
            </h4>
          )}
        </Card>
      </div>
    </>
  );
}

export default ReturnBook;
