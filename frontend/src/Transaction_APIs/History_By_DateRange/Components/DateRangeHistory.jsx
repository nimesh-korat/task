import { Card, Col, Row } from "react-bootstrap";

function DateRangeHistory({
  userName,
  bookName,
  issueDate,
  returnDate,
  userDOB,
  userContactNumber,
  userEmail,
}) {
  return (
    <div className="d-flex justify-content-center mb-5">
      <Card style={{ padding: "20px", width: "50rem" }}>
        <Card.Header as="h5">
          <div className="d-flex justify-content-between">
            <h6 className="text-start">User Name: {userName}</h6>
            <h6 className="text-end">Book Name: {bookName}</h6>
          </div>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col className="text-start">
              <Card.Title as="h6">Issued On: {issueDate}</Card.Title>
            </Col>
            <Col className="text-end">
              <Card.Title as="h6">Returned On: {returnDate}</Card.Title>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="text-start">
              <Card.Text>Mobile No: {userContactNumber}</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Text>Email: {userEmail}</Card.Text>
            </Col>
          </Row>
          <Card.Text>Date of Birth: {userDOB}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DateRangeHistory;
