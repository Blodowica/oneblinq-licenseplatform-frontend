import React, { Component } from "react";
import "./LoginComponent.css";
import { Form, Button, Container, Row } from 'react-bootstrap';
import RegistrationComponent from '../RegistrationComponent/RegisrationComponent';


export function LoginComponent({onSignUpClick}){
    return (
      <Container>
      <div className="RegistrationForm  align-items-center justify-content-center  text-center">
        <h1 className="mt-3">Sign In</h1>

        <Form.Group className="mb-4  mt-5 " controlId="formBasicEmail">

          <Form.Control size="lg" type="email" placeholder="Enter email" className="rounded-pill" />


        </Form.Group>

        <Form.Group className="mb-4 rounded-pill" controlId="formBasicPassword">

          <Form.Control type="password" placeholder="Password" size="lg" className="rounded-pill" />
        </Form.Group>



        <div>
      
          <a  onClick={()=>onSignUpClick()}> Don't have an account? Sign Up!</a>
          <br></br>
          <a href='#'> Forgot password!</a>

        </div>
        <div>

          <Button className="RegButton button-center mt-3" type="submit">
            Login
          </Button>

        </div>



      </div >
    </Container>
    );
  }


export default LoginComponent;