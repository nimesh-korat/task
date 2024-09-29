import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import DateRangeHistory from "./Components/DateRangeHistory";
import { useMutation } from "@tanstack/react-query";
import { getTransactionsByDateRange } from "../../API_Functions/APIs";
import { toast } from "react-toastify";

function HistoryByDateRange() {
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [transactions, setTransactions] = React.useState([]);

  const dateRangeMutation = useMutation({
    mutationKey: ["transactionsByDateRange"],
    mutationFn: getTransactionsByDateRange,
    onSuccess: (data) => {
      setTransactions(data.data || []);
      setFromDate("");
      setToDate("");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fromDate && toDate) {
      dateRangeMutation.mutate({ fromDate, toDate });
    } else {
      toast.error("Please select both dates");
    }
  };

  return (
    <>
      <h1 className="text-center">Search Books By Rent Range</h1>
      <div className="d-flex justify-content-center">
        <Card style={{ padding: "20px", width: "50rem" }}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridFromDate">
                <Form.Text className="text-muted">From Date</Form.Text>
                <Form.Control
                  type="date"
                  value={fromDate}
                  onChange={handleFromDateChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridToDate">
                <Form.Text className="text-muted">To Date</Form.Text>
                <Form.Control
                  type="date"
                  value={toDate}
                  onChange={handleToDateChange}
                  required
                />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
        </Card>
      </div>

      {transactions && transactions.length > 0 && (
        <div className="mt-5">
          <h5 className="text-center">Transactions</h5>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <DateRangeHistory
                key={transaction.issueDate}
                userName={transaction.userName}
                bookName={transaction.bookName}
                issueDate={new Date(transaction.issueDate).toDateString()}
                returnDate={
                  transaction.returnDate
                    ? new Date(transaction.returnDate).toDateString()
                    : "Not Returned"
                }
                userDOB={new Date(transaction.userDOB).toDateString()}
                userContactNumber={transaction.userContactNumber}
                userEmail={transaction.userEmail}
              />
            ))
          ) : (
            <h6 className="text-center">No Transactions Found</h6>
          )}
        </div>
      )}
    </>
  );
}

export default HistoryByDateRange;
