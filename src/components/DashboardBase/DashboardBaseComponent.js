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
        <Navbar.Brand href="/dashboard" className="OneBlinqLogo p-0">
          <img
            src={logo}
            width="290px"
            className="d-inline-block ms-5"
            alt="OneBlinq logo"
          />
        </Navbar.Brand>
        <Container fluid className="d-flex justify-content-end me-2">
          <Nav.Link href="#profile" >
            <MdPerson color="white" size="2em" />
          </Nav.Link>
          <NavDropdown align="end" title={navDropdownTitle} variant="dark" className="LanguageDropdownIcon">
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
        <Tab eventKey="accessTokens" title="Access tokens">

        </Tab>
        <Tab eventKey="products" title="Products">

        </Tab>
      </Tabs>
    );
  }

  return (
    <>
      <div className="Full">
        <NavigationBar />
        <Container fluid className="mt-3">
          <Row className="justify-content-center">
            <Col>
              <Card style={{ backgroundColor: "#ff000000", borderWidth: "0px" }}>
                <Card.Header style={{ backgroundColor: "#6240d7" }} className="DataManagementCardHeader text-white">
                  <Card.Title style={{ fontSize: "30px" }} className="mb-1 ms-3">Data Management</Card.Title>
                </Card.Header>
                <Card.Body style={{ backgroundColor: "white" }}>
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