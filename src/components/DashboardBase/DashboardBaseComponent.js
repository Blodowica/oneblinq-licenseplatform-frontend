import './DashboardBaseComponent.css'
import React, { useState } from 'react';
import { Tabs, Row, Col, Container, Tab, Card, Navbar, Nav, NavDropdown, Glyphicon } from 'react-bootstrap';
import LoginComponent from '../LoginComponent/LoginComponent';
import LicenseTableComponent from '../LicenseTable/LicenseTableComponent';
import UsersTableComponent from '../UsersTable/UsersTableComponent';
import SvgBitch from '../../assets/Logo.svg';
import profileBitch from '../../assets/profileLogo.svg'
import langBitch from '../../assets/langIcon.svg'
import { MdLanguage } from "react-icons/md";




export function DashboardBaseComponent() {


  function NavigationBar() {
    const navDropdownTitle = (<MdLanguage size="2em"/>);

    return (
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={SvgBitch}
              width="50%"
              height="50%"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav.Link href="#profile">
            <img
              src={profileBitch}
              width="50%"
              height="50%"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Nav.Link>
          <NavDropdown title={navDropdownTitle} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Dutch</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">English</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    )
  }

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
          <LicenseTableComponent />
        </Tab>
        <Tab eventKey="users" title="Users">
          <UsersTableComponent />
        </Tab>
        <Tab eventKey="accessTokens" title="Access tokens" disabled>

        </Tab>
        <Tab eventKey="products" title="Products" disabled>

        </Tab>
      </Tabs>
    );
  }

  return (
    <>
      <NavigationBar />
      <div className="Full d-flex align-items-stretch ">
        <Container fluid >
          <Row>
            <Col>
              <Card style={{ borderRadius: 20, backgroundColor: "#EDEFFC" }}>
                <Card.Body>
                  <Card.Title>Data Management</Card.Title>
                  <ControlledTabs />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}