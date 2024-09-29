import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { issueBook } from "../../API_Functions/APIs"; // Assuming this is the issue book API function
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function IssueBook() {
  const [issueData, setIssueData] = React.useState({
    bName: "",
    userId: "",
  });
  const navigate = useNavigate();

  const issueBookMutation = useMutation({
    mutationKey: ["issueBook"],
    mutationFn: issueBook,
    onSuccess: (data) => {
      toast.success("Book issued successfully", {
        onClose: () => {
          navigate("/");
        },
      });
      setIssueData({ bName: "", userId: "" });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssueData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    issueBookMutation.mutate(issueData);
  };

  return (
    <>
      <h1 className="text-center">Issue Book</h1>
      <div className="d-flex justify-content-center">
        <Card style={{ padding: "20px", width: "50rem" }}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formbName">
                <Form.Control
                  type="text"
                  name="bName"
                  placeholder="Enter Full Book Name"
                  value={issueData.bName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formUserId">
                <Form.Control
                  type="text"
                  name="userId"
                  placeholder="Enter User ID"
                  value={issueData.userId}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default IssueBook;
