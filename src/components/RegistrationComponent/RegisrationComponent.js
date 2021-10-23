import React, { Component, useState } from "react";
import "./RegistrationComponent.css";
import { Form, Card, Button, InputGroup, FormControl, Row, Col, Container } from 'react-bootstrap'
import { MdEmail, MdLock } from "react-icons/md";

function RegistrationComponent({ toLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");


  function arePasswordsSame() {
    if (password && repeatPassword && password == repeatPassword) {
      return true
    }
    return false
  }

  function register() {
    if(!arePasswordsSame()) return alert("Passwords aren't same")
  }

  return (
    <>
      <Card className="m-0 m-lg-5 p-0 p-sm-3 p-lg-4 pb-lg-0 pb-md-0 pb-sm-0" style={{ borderRadius: 20, backgroundColor: "#EDEFFC" }}>
        <Card.Body>
          <Card.Text className="text-center display-3 mb-3">Register</Card.Text>
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

            <InputGroup className="my-3">
              <InputGroup.Text>
                <MdLock size="2em" />

              </InputGroup.Text>
              <Form.Control value={repeatPassword} type="password" placeholder="******" onChange={(e) => setRepeatPassword(e.target.value)} />
            </InputGroup>


            <Row>
              <Col className="text-center">

                <Button onClick={() => register()} className="rounded-pill" style={{ paddingLeft: "30px", paddingRight: "30px", backgroundColor: "#6933C8", color: "white" }} variant="register" size="lg">
                  Register
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">

                <Button onClick={() => toLogin()} className="mt-2" variant="none" size="lg">
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default RegistrationComponent;
