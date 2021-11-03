import './DashboardBaseComponent.css'
import React, { useState } from 'react';
import { Tabs, Row, Col, Container, Tab, Card } from 'react-bootstrap';
import LoginComponent from '../LoginComponent/LoginComponent';
import LicenseTableComponent from '../LicenseTable/LicenseTableComponent';
import UsersTableComponent from '../UsersTable/UsersTableComponent';



export function DashboardBaseComponent() {

  function ControlledTabs() {
    const [key, setKey] = useState('licenses');
  
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="licenses" title="Licenses">
          <LicenseTableComponent/>
        </Tab>
        <Tab eventKey="users" title="Users">
          <UsersTableComponent/>
        </Tab>
        <Tab eventKey="accessTokens" title="Access tokens" disabled>
          
        </Tab>
        <Tab eventKey="products" title="Products" disabled>
          
        </Tab>
      </Tabs>
    );
  }

    return (
      <div className="Full d-flex align-items-stretch ">
      <Container fluid>
        <Row>
        <Col>
          <Card style={{ borderRadius: 20, backgroundColor: "#EDEFFC" }}>
            <Card.Body>
              <Card.Title>Data Management</Card.Title>
              <ControlledTabs/>
            </Card.Body>
          </Card>
        </Col>
        </Row>


      </Container>
      </div >
    )
  }