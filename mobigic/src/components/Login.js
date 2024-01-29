import React, { useState } from "react";
import "../App.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const history = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = data;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const data = userCredential.user;
        console.log(data);
        window.alert("successfully login ");
        history("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert(errorCode + " error crendential" + errorMessage);
      });
  };

  return (
    <>
      <div className="login">
        <Card style={{ width: "20rem" }}>
          <Card.Body className="">
            <Card.Title>Login FROM</Card.Title>
            <Card.Text>
              <Form method="post">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>

                <div className="my-3">
                  <Link to="/register" className="my-3">
                    existing user?Login
                  </Link>
                </div>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Login;
