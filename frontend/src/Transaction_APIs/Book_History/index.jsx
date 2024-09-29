import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import CurrentIssued from "./Components/CurrentIssued";
import OldIssued from "./Components/OldIssued";
import { useMutation } from "@tanstack/react-query";
import { getBookHistory } from "../../API_Functions/APIs";
import { toast } from "react-toastify";

function BookHistory() {
  const [bName, setBName] = React.useState("");
  const [history, setHistory] = React.useState({
    totalCount: 0,
    currentlyIssued: null,
    issuedHistory: [],
  });

  const bookHistoryMutation = useMutation({
    mutationKey: ["bookHistory"],
    mutationFn: getBookHistory,
    onSuccess: (data) => {
      const { totalCount, currentlyIssued, issuedHistory } = data.data;
      setHistory({
        totalCount,
        currentlyIssued,
        issuedHistory,
      });
      setBName("");
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
      bookHistoryMutation.mutate({ bName });
    } else {
      alert("Please enter a book name");
    }
  };

  return (
    <>
      <h1 className="text-center">Book Transaction History</h1>
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

      {history.totalCount !== 0 && (
        <h6 className="text-center mt-4">
          Total Books Issued: {history.totalCount}
        </h6>
      )}
      {history.currentlyIssued &&
      typeof history.currentlyIssued === "object" ? (
        <>
          <h5 className="text-center mt-4">Currently Issued Book</h5>
          <CurrentIssued
            userName={history.currentlyIssued.userName}
            issueDate={new Date(
              history.currentlyIssued.issueDate
            ).toDateString()}
            userEmail={history.currentlyIssued.userEmail}
            userDOB={new Date(history.currentlyIssued.userDOB).toDateString()}
            userContactNumber={history.currentlyIssued.userContactNumber}
            userAddress={history.currentlyIssued.userAddress}
            userDateofRegistration={new Date(
              history.currentlyIssued.userDateofRegistration
            ).toDateString()}
          />
        </>
      ) : (
        <h5 className="text-center mt-4">No Book Currently Issued</h5>
      )}

      {history.issuedHistory.length > 0 && (
        <>
          <h5 className="text-center mt-4">Issued History</h5>
          {history.issuedHistory.map((book) => (
            <OldIssued
              key={book.issueDate}
              userName={book.userName}
              issueDate={new Date(book.issueDate).toDateString()}
              returnDate={new Date(book.returnDate).toDateString()}
              userEmail={book.userEmail}
              userDOB={new Date(book.userDOB).toDateString()}
              userContactNumber={book.userContactNumber}
              userAddress={book.userAddress}
              userDateofRegistration={new Date(
                book.userDateofRegistration
              ).toDateString()}
            />
          ))}
        </>
      )}
    </>
  );
}

export default BookHistory;
