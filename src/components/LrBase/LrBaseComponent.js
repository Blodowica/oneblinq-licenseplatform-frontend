import './LrBaseComponent.css'
import React from 'react';


import { Button, Row, Col, Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import RegistrationComponent from '../RegistrationComponent/RegisrationComponent';
export function LrBaseComponent() {

  return (

    <div className="Full d-flex align-items-center ">
      <div className="BackgroundLogo">

      </div>
      <Container fluid >
        <Row>

          <Col md={{ span: 5, offset: 7 }} className="RegLogFormCol" xs={12} sm={12}>


            <RegistrationComponent />

          </Col>

        </Row>


      </Container>
    </div >
  )
}