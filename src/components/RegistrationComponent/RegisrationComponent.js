import React, { Component } from "react";
import "./RegistrationComponent.css";
import { Form, Button, Container, Row, InputGroup } from 'react-bootstrap';

export function RegistrationComponent() {

  //<InputGroup.Text id="basic-addon1" className="RegInputGroupEmail">@</InputGroup.Text>
  return (
    <Container>
      <div className="RegistrationForm  align-items-center justify-content-center  text-center">
        <h1 className="mt-3">Sign Up</h1>

        <Form.Group className="mb-4  mt-5 " controlId="formBasicEmail">

          <Form.Control size="lg" type="email" placeholder="Enter email" className="rounded-pill" />


        </Form.Group>

        <Form.Group className="mb-4 rounded-pill" controlId="formBasicPassword">

          <Form.Control type="password" placeholder="Password" size="lg" className="rounded-pill" />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPassword">

          <Form.Control type="password" size="lg" placeholder="Confirm Password" className="rounded-pill" />
        </Form.Group>

        <div>
          <a href='#'> Already have a account? Sign In!</a>

        </div>
        <div>

          <Button className="RegButton button-center mt-3" type="submit">
            Register
          </Button>

        </div>


        {
        /* <Form className="RegForm">
        
        <h3 className="RegText">Register</h3>
        
        <input className="RegEmailInput" placeholder="Email"></input>
        <input className="RegPassInput" placeholder="******" type="password"></input>
        <input className="RegPassConfirmationInput" placeholder="******" type="password"></input>
        <button className="RegBtn" onClick="">Login</button>
        <a className="Link" href="">Already have an account? Sign in</a>
        </Form>
        <div className="EmailIcon"></div>
        
        <div className="PasswordIcon"></div>
      <div className="PasswordIconConfirmation"></div> */}
      </div >
    </Container>
  )
}


export default RegistrationComponent;
