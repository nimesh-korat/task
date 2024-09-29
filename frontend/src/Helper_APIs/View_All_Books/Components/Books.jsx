import { Card, Col, Row } from "react-bootstrap";

function Books({bookId, bookName, bookCategory, bookPrice}) {
  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ padding: "20px", width: "50rem" }}>
        <Card.Header as="h5">{bookName}</Card.Header>
        <Card.Body>
          <Card.Title># {bookId}</Card.Title>
          <Row>
            <Col className="text-start">
              <Card.Text>Category: {bookCategory}</Card.Text>
            </Col>
            <Col className="text-end">
              <Card.Text>Rent: ₹ {bookPrice}</Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Books;
