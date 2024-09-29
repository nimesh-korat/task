import { Card, Col, Row } from "react-bootstrap";

function IssuedHistory({ bookName, issueDate, returnDate, totalRent, status }) {
  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <Card style={{ padding: "20px", width: "50rem" }}>
        <Card.Header as="h5">{bookName}</Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col className="text-start">
              <Card.Title as="h6">Issued On: {issueDate}</Card.Title>
            </Col>
            <Col className="text-end">
              <Card.Title as="h6">Returned On: {returnDate}</Card.Title>
            </Col>
          </Row>
          <Card.Text>Total Rent: ₹ {totalRent}</Card.Text>
          {/* Apply inline conditional styling directly */}
          <Card.Text
            style={{
              color: status === "BOOK IS ISSUED" ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            Status: {status}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default IssuedHistory;
