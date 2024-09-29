import { Card } from "react-bootstrap";
import '../css/card-hover-zoom.css'


function cardButton(header, text, onClick) {
  return (
    <Card
      bg={"light"}
      text={"dark"}
      style={{
        width: "18rem",
        transition: "transform 0.3s ease-in-out",
      }}
      className="mb-2 card-hover-zoom"
      onClick={onClick}
    >
      <Card.Header as="h5">{header}</Card.Header>
      <Card.Body>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default cardButton;
