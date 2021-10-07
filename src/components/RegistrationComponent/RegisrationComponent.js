import React, { Component } from "react";
import "./RegistrationComponent.css";
import Form from 'react-bootstrap/Form';

class RegistrationComponent extends React.Component {
  render() {
    return (
      <div>
        <Form className="RegForm">
         
              <h3 className="RegText">Register</h3>
          
            <input className="RegEmailInput" placeholder="Email"></input>
            <input className="RegPassInput" placeholder="******" type="password"></input>
            <input className="RegPassConfirmationInput" placeholder="******" type="password"></input>
            <button className="RegBtn" onClick="">Login</button>
             <a className="Link" href="">Already have an account? Sign in</a>
        </Form>
        <div className="EmailIcon"></div>
        
        <div className="PasswordIcon"></div>
        <div className="PasswordIconConfirmation"></div>
      </div>
    );
  }
}

export default RegistrationComponent;
