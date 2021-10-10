import React, { Component } from "react";
import "./LoginComponent.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import EmailIcon from './Email.svg'
import ReactDOM from 'react-dom'
class LoginComponent extends React.Component {
  render() {
    return (
    
              <div className= "FormBackground align-items-center"> 
               
       <Form>
          <h3 className="FormTitle">Sign in</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label classname="FromLabel"> Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
         
          <Form.Text className="text-muted">
                We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label classname="FromLabel" >Password</Form.Label>
        <Form.Control type="password" placeholder="Password"/>
        </Form.Group>

        <Button variant="primary" type="submit">
              Submit
        </Button>
        </Form>
        <div className="EmailIcon"></div>
        
        <div className="PasswordIcon"></div>
        <div className="PasswordIconConfirmation"></div>
       
      </div>
      
    );
  }
}

export default LoginComponent;