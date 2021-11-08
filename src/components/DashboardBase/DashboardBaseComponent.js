import './DashboardBaseComponent.css'
import React, { useState } from 'react';
import { Tabs, Row, Col, Container, Tab, Card, Navbar, Nav, NavDropdown, Glyphicon, Button } from 'react-bootstrap';
import LoginComponent from '../LoginComponent/LoginComponent';
import LicenseTableComponent from '../LicenseTable/LicenseTableComponent';
import UsersTableComponent from '../UsersTable/UsersTableComponent';
import logo from '../../assets/Logo.svg';
import profileIcon from '../../assets/profileIcon.svg'
import { MdLanguage, MdPerson } from "react-icons/md";




export function DashboardBaseComponent() {


  function NavigationBar() {
    const navDropdownTitle = (<MdLanguage color="white" size="2em" />);

    return (
      <Navbar bg="dark">
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="50%"
            height="50%"
            className="d-inline-block ms-5"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Container className="d-flex justify-content-end">
          <Nav.Link href="#profile" >
            <MdPerson color="white" size="2em" />
          </Nav.Link>
          <NavDropdown title={navDropdownTitle} color="white" id="basic-nav-dropdown" >
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
      <div className="Full">
        <NavigationBar />
        <Container fluid className="pt-3">
          <Row>
            <Col>
              <Card style={{ borderRadius: 20, backgroundColor: "#EDEFFC" }}>
                <Card.Header>
                  <Card.Title>Data Management</Card.Title>
                </Card.Header>
                <Card.Body >
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