import React, {useState} from 'react';
import './UserProfilePageComponent.css';
import {MdLanguage, MdPerson} from "react-icons/md";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from "../../assets/Logo.svg";

export function UserProfilePageComponent() {

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

    return (
        <>
            <div className="Full">
                <NavigationBar/>
            </div>
        </>
    )
}