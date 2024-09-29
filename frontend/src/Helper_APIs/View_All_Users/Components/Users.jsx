import { Card, Col, Row } from "react-bootstrap";

function Users({
  username,
  userId,
  dob,
  dateOfRegistration,
  mobileNo,
  email,
  address,
}) {
  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <Card style={{ padding: "20px", width: "50rem" }}>
        <Card.Header>
          <h5 className="text-start">{username}</h5>
          <h6 className="text-start"># {userId}</h6>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col className="text-start">
              <Card.Text>DOB: {dob}</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Text>Date Of Registration: {dateOfRegistration}</Card.Text>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="text-start">
              <Card.Text>Mobile No: {mobileNo}</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Text>Email: {email}</Card.Text>
            </Col>
          </Row>
          <Card.Text>Address: {address}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Users;
