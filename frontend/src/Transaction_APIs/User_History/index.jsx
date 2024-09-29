import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import IssuedHistory from "./Components/issuedHistory";
import { useMutation } from "@tanstack/react-query";
import { getUserHistory } from "../../API_Functions/APIs";
import { toast } from "react-toastify";

function UserHistory() {
  const [userId, setUserId] = React.useState("");
  const [history, setHistory] = React.useState([]);

  const userHistoryMutation = useMutation({
    mutationKey: ["userHistory"],
    mutationFn: getUserHistory,
    onSuccess: (data) => {
      setHistory(data.data || []);
      setUserId("");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId.trim()) {
      userHistoryMutation.mutate({ userId });
    } else {
      toast.error("Please enter a User ID");
    }
  };

  return (
    <>
      <h1 className="text-center">User Transaction History</h1>
      <div className="d-flex justify-content-center">
        <Card style={{ padding: "20px", width: "50rem" }}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} xs={9} controlId="formGridUserId">
                <Form.Control
                  type="text"
                  placeholder="Enter User ID"
                  value={userId}
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

      {history.length > 0 ? (
        <>
          <h5 className="text-center mt-4">Issued History</h5>
          {history.map((book) => (
            <IssuedHistory
              key={book.issueDate}
              bookName={book.bookName}
              issueDate={new Date(book.issueDate).toDateString()}
              returnDate={book.returnDate ? new Date(book.returnDate).toDateString() : "Pending"}
              status={book.status}
              totalRent={book.totalRent && book.totalRent !== null ? "₹" + book.totalRent : "Pending"}
            />
          ))}
        </>
      ) : (
        <h5 className="text-center mt-4">No Transaction History Found</h5>
      )}
    </>
  );
}

export default UserHistory;
