import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { addUser } from "../../API_Functions/APIs";
import { useNavigate } from "react-router-dom";

function AddUsers() {
  const [userData, setUserData] = React.useState({
    uName: "",
    uDOB: "",
    uContactNumber: "",
    uEmail: "",
    uAddress: "",
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addUserMutation = useMutation({
    mutationKey: ["users"],
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User Added Successfully", {
        onClose: () => navigate("/"),
      });
      setUserData({
        uName: "",
        uDOB: "",
        uContactNumber: "",
        uEmail: "",
        uAddress: "",
      });
    },
    onError: (error) => {
      toast.error(error.response.data?.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addUserMutation.mutate(userData);
  };

  return (
    <>
      <h1 className="text-center">Add Users</h1>
      <div className="d-flex justify-content-center">
        <Card style={{ padding: "20px" }}>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="uName"
                  placeholder="Enter Name"
                  value={userData.uName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridDob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="uDOB"
                  value={userData.uDOB}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="uEmail"
                  placeholder="Enter Email"
                  value={userData.uEmail}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  type="tel"
                  name="uContactNumber"
                  maxLength={10}
                  placeholder="Enter Phone No"
                  value={userData.uContactNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="uAddress"
                placeholder="Enter Address"
                value={userData.uAddress}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default AddUsers;
