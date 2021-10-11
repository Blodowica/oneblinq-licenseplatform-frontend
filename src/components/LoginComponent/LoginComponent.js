import React, { Component } from "react";
import "./LoginComponent.css";
import { Form, Button, Container, Row } from 'react-bootstrap';
import EmailIcon from './Email.svg'
import ReactDOM from 'react-dom'

class LoginComponent extends React.Component {
  render() {
    return (
      <Container>

        <div className="FormBackground align-items-center">
          <Row >

            <h3 className="FormTitle">Sign in</h3>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label classname="FromLabel"> Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />

              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label classname="FromLabel" >Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Row className=" justify-content-center d-flex ">

              <Button variant="primary" type="submit">
                Submit
              </Button>

          </Row>




        </div>
      </Container>
    );
  }
}

export default LoginComponent;