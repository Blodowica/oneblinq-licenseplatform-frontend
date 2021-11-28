import React, {useState} from 'react';
import './UserProfilePageComponent.css';
import {MdLanguage, MdPerson} from "react-icons/md";
import {Container, Nav, Navbar, NavDropdown, Button, InputGroup, Form} from "react-bootstrap";
import logo from "../../assets/Logo.svg";
//import {DashboardBaseComponent} from "../DashboardBase/DashboardBaseComponent";

export function UserProfilePageComponent() {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");

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

    function ChangePasswordField() {
        // const currentPassword = "currentPassword";

        return (
            <div id="changePasswordField">
                <Form>
                    <h1>Change password</h1>

                    <h3>Current password</h3>
                    <InputGroup style={{width: "60%", margin: "auto"}}>
                        {/*<InputGroup.Text>Current password</InputGroup.Text>*/}
                        <Form.Control
                                      value={currentPassword}
                                      onChange={(e) => setCurrentPassword(e.target.value)}
                                      placeholder="******"
                        />
                    </InputGroup>

                    <h3>New password</h3>
                    <InputGroup>
                        {/*<InputGroup.Text>Current password</InputGroup.Text>*/}
                        <Form.Control className="passwordInputBox"
                                      value={newPassword}
                                      onChange={(e) => setNewPassword(e.target.value)}
                                      placeholder="******" />
                    </InputGroup>

                    <h3>Repeat new password</h3>
                    <InputGroup>
                        {/*<InputGroup.Text>Current password</InputGroup.Text>*/}
                        <Form.Control className="passwordInputBox"
                                      value={repeatNewPassword}
                                      onChange={(e) => setRepeatNewPassword(e.target.value)}
                                      placeholder="******" />
                    </InputGroup>
                </Form>
            </div>
        )
    }

    return (
        <>
            <div className="Full">
                <NavigationBar/>
                <div id="mainProfileField">
                    <ChangePasswordField/>
                </div>
            </div>
        </>
    )
}