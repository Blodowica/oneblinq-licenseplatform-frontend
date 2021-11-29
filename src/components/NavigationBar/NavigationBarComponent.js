import './NavigationBarComponent.css'
import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../../assets/Logo.svg';
import { MdLanguage, MdPerson } from "react-icons/md";

import i18next from 'i18next';


export function NavigationBarComponent() {

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
        <Nav.Link href="/profile" >
          <MdPerson color="white" size="2em" />
        </Nav.Link>
        <NavDropdown align="end" title={navDropdownTitle} variant="dark" className="LanguageDropdownIcon">
          <NavDropdown.Item href="#action/3.1" onClick={() => i18next.changeLanguage('nl')}>Dutch</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4" onClick={() => i18next.changeLanguage('en')}> English</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar >
  )
}
