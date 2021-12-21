import React, { useState } from "react";
import "./LoginComponent.css";
import { Form, Card, Button, InputGroup, Row, Col } from 'react-bootstrap'
import { MdEmail, MdLock } from "react-icons/md";
import { useAuth } from "../../actions";


export function LoginComponent({ toRegister, toForgottenPassword }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const authActions = useAuth()

  function login() {
    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    if (!validateEmail) return alert("Wrong email format")
    if (!password || password.length < 5) return alert("Password needs to be 5+ characters long")
    authActions.login(email, password)
  }
  return (
    <>
      <Card className="m-0 m-lg-5 p-0 p-sm-3 p-lg-4 pb-lg-0 pb-md-0 pb-sm-0" style={{ borderRadius: 20, backgroundColor: "#EDEFFC" }}>
        <Card.Body>
          <Card.Text className="text-center display-3 mb-3">Login</Card.Text>
          <Form>

            <InputGroup className="my-3">
              <InputGroup.Text>
                <MdEmail size="2em" />

              </InputGroup.Text>
              <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

            </InputGroup>

            <InputGroup className="my-3">
              <InputGroup.Text>
                <MdLock size="2em" />

              </InputGroup.Text>
              <Form.Control value={password} type="password" placeholder="******" onChange={(e) => setPassword(e.target.value)} />

            </InputGroup>
            <Row className="me-1 mb-3">
              <Col className="text-end">
                <span onClick={() => toForgottenPassword()} style={{cursor: "pointer"}}>
                  Forgot password?
                </span>
              </Col>
            </Row>


            <Row>
              <Col className="text-center">

                <Button onClick={() => login()} className="rounded-pill" style={{ paddingLeft: "30px", paddingRight: "30px", backgroundColor: "#6933C8", color: "white" }} size="lg">
                  Login
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">

                <Button onClick={() => toRegister()} className="mt-2" variant="none" size="lg">
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}


export default LoginComponent;