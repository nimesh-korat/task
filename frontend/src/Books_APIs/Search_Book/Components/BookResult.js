import { Card, Col, Row } from "react-bootstrap";

function BookResults({ name, category, rentPerDay }) {
    return <div className="d-flex justify-content-center mt-5">
        <Card style={{ padding: "20px", width: "50rem" }}>
            <Card.Header as="h5">{name}</Card.Header>
            <Card.Body>
                <Row>
                    <Col className="text-start">
                        <Card.Title>{category}</Card.Title>
                    </Col>
                    <Col className="text-end">
                        <Card.Title>₹ {rentPerDay}</Card.Title>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </div>;
}

export default BookResults