import { Card, Col, Row } from "react-bootstrap";

function OldIssued({
  userName,
  issueDate,
  returnDate,
  userDOB,
  userDateofRegistration,
  userContactNumber,
  userEmail,
  userAddress,
}) {
  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <Card style={{ padding: "20px", width: "50rem" }}>
        <Card.Header as="h5">{userName}</Card.Header>
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
              <Card.Text>Date of Birth: {userDOB}</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Text>Date of Registration: {userDateofRegistration}</Card.Text>
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
          <Card.Text>Address: {userAddress}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default OldIssued;
