import './DashboardBaseComponent.css'
import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Tabs, Row, Col, Container, Tab, Card, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import logo from '../../assets/Logo.svg';
import { MdLanguage, MdPerson } from "react-icons/md";
import { AccessTokensTableComponent, UsersTableComponent, LicenseTableComponent, ProductsTableComponent } from '../index';

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
    let history = useHistory();
    let URI = useLocation();

    const [key, setKey] = useState(null);
    if (key == null) {
      const Qtable = URI.search.replace("?table=", "");
      if (Qtable == "") {
        setKey("licenses");
      }
      else {
        setKey(Qtable);
      }
    }

    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => { setKey(k); history.push("?table=" + k) }}
        className="mb-3"
        unmountOnExit={true}
      >
        <Tab eventKey="licenses" title="Licenses">
          <LicenseTableComponent />
        </Tab>
        <Tab eventKey="users" title="Users">
          <UsersTableComponent />
        </Tab>
        <Tab disabled eventKey="freeTrials" title="Free trials">
          
        </Tab>
        <Tab eventKey="accessTokens" title="Access tokens">
          <AccessTokensTableComponent />
        </Tab>
        <Tab eventKey="products" title="Products">
          <ProductsTableComponent />
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