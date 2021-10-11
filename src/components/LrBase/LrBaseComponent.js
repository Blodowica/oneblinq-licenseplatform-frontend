import './LrBaseComponent.css'
import React, { useState } from 'react';
import LoginComponent from '../LoginComponent/LoginComponent';
import { Button, Row, Col, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import RegistrationComponent from '../RegistrationComponent/RegisrationComponent';

export function LrBaseComponent() {
  const [isRegister, setIsRegister] = useState(false)

  return (


    <div className="Full d-flex align-items-center ">
      <div className="BackgroundLogo">

      </div>
      <Container fluid >
        <Row>

          <Col md={{ span: 5, offset: 7 }} className="RegLogFormCol" xs={12} sm={12}>

            {
              isRegister ? <RegistrationComponent /> : <LoginComponent onSignUpClick={() => setIsRegister(true)} />
             
             } 

            
           



          </Col>

        </Row>


      </Container>
    </div >
  )
}