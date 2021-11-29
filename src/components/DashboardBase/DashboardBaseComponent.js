import './DashboardBaseComponent.css'
import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Tabs, Row, Col, Container, Tab, Card, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import logo from '../../assets/Logo.svg';
import { MdLanguage, MdPerson } from "react-icons/md";
import { AccessTokensTableComponent, UsersTableComponent, LicenseTableComponent, ProductsTableComponent } from '../index';
import { NavigationBarComponent } from '../NavigationBar/NavigationBarComponent';

export function DashboardBaseComponent() {

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
        <NavigationBarComponent />
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