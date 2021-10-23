import React, { Component, useState } from "react";
import "./LoginComponent.css";
import { Form, Card, Button, InputGroup, FormControl, Row, Col, Container } from 'react-bootstrap'
import { MdEmail, MdLock } from "react-icons/md";
import RegistrationComponent from '../RegistrationComponent/RegisrationComponent';


export function LoginComponent({ toRegister, toForgottenPassword }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function login() {
    
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
              <Form.Control value={password} placeholder="******" onChange={(e) => setPassword(e.target.value)} />

            </InputGroup>
            <Row className="justify-content-end me-1 mb-3">

              <span onClick={() => toForgottenPassword()} className="text-end ">
                Forgot password?
              </span>
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