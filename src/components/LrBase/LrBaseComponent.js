import './LrBaseComponent.css'
import React, { useState } from 'react';
import LoginComponent from '../LoginComponent/LoginComponent';
import { Button, Row, Col, Container } from 'react-bootstrap';
import RegistrationComponent from '../RegistrationComponent/RegisrationComponent';

export function LrBaseComponent() {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div className="Full d-flex align-items-center ">
      <div className="BackgroundLogo" />
      <Container fluid>
        <Row style={{ justifyContent: "end" }}>

          <Col sm={12} md={8} lg={6} xl={5} xxl={4} >
            {isRegister ?
              <RegistrationComponent toLogin={() => setIsRegister(false)} />
              :
              <LoginComponent toRegister={() => setIsRegister(true)}/>
            }
          </Col>

        </Row>


      </Container>
    </div >
  )
}