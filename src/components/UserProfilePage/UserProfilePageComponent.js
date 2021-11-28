import React, { useState } from 'react';
import './UserProfilePageComponent.css';
import { MdLanguage, MdPerson } from "react-icons/md";
import { Container, Nav, Navbar, NavDropdown, Button, InputGroup, Form, Card, Col, Row } from "react-bootstrap";
import logo from "../../assets/Logo.svg";
//import {DashboardBaseComponent} from "../DashboardBase/DashboardBaseComponent";

export function UserProfilePageComponent() {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");


    function NavigationBar() {
        const navDropdownTitle = (<MdLanguage color="white" size="2em" />);

        return (
            <Navbar bg="dark">
                <Navbar.Brand href="/dashboard">
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

    function ChangePassword() {
        // const currentPassword = "currentPassword";

        return (
            <Card style={{ backgroundColor: "#DEEFF4", minHeight: "85vh" }} className="mb-3">
                <Container>
                    <h1 className="text-center">Change password</h1>
                    <Card.Body>
                        <Row>
                            <Form.Label>Current password</Form.Label>
                            <Form.Control type="password" readOnly value="password" />
                        </Row>
                        <Row>
                            <Form.Label>New password</Form.Label>
                            <Form.Control type="password" readOnly value="password" />
                        </Row>
                        <Row>
                            <Form.Label>Repeat new password</Form.Label>
                            <Form.Control type="password" readOnly value="password" />
                        </Row>
                        <Row className="text-center justify-content-center">
                            <Col xs="7">
                                <Button onClick={() => ChangePassword()}
                                    style={{
                                        borderRadius: "30px",
                                        backgroundColor: "#EFA9AE",
                                        color: "#02021E",
                                        margin: "20px 0px 0px 0px",
                                        fontSize: "22px",
                                        border: "transparent"
                                    }}>Change password</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Container>
            </Card>
        )
    }

    function EditPersonalInfo() {

        return (
            <Card style={{ backgroundColor: "#DEEFF4", minHeight: "85vh" }}>
                <Container className="p-3">
                    <h1>Personal details</h1>

                    <Row className="mb-3">
                        <Col xs lg="7">
                            <Form.Label className="mb-1">First name</Form.Label>
                            <Form.Control readOnly value="First name hkjlk;l" />
                        </Col>
                        <Col xs lg="5">
                            <Form.Label className="mb-1">Last Name</Form.Label>
                            <Form.Control readOnly value="Last Nmae" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs lg="7">
                            <Form.Label className="mb-1">Email</Form.Label>
                            <Form.Control readOnly value="First name hkjlk;l" />
                        </Col>
                        <Col xs lg="5">
                            <Form.Label className="mb-1">Date of b</Form.Label>
                            <Form.Control readOnly value="Email @uygknlk" />
                        </Col>
                    </Row>
                </Container>
                
                <Container className="pb-3 p-3" >
                <hr />
                    <h1>Location details</h1>
                    <Row className="mb-3">
                        <Col xs lg="7">
                            <Form.Label className="mb-1">Adress</Form.Label>
                            <Form.Control readOnly value="First name hkjlk;l" />
                        </Col>
                        <Col xs lg="5">
                            <Form.Label className="mb-1">Postal Code</Form.Label>
                            <Form.Control readOnly value="Last Nmae" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs lg="7">
                            <Form.Label className="mb-1">City</Form.Label>
                            <Form.Control readOnly value="First name hkjlk;l" />
                        </Col>
                        <Col xs lg="5">
                            <Form.Label className="mb-1">Country</Form.Label>
                            <Form.Control readOnly value="Email @uygknlk" />
                        </Col>
                    </Row>
                    {/* <div className="leftQuarterOfPersonalInfoField">
                            <div className="editPersonalInfoInputSingleField">
                                <h4 className="personalInfoInputFieldHeader">Address</h4>
                                <InputGroup>
                                    <Form.Control value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        type="text"
                                        placeholder="Address"
                                        aria-required="true"
                                        style={{ borderRadius: "30px" }} />
                                </InputGroup>
                            </div>
                            <div className="editPersonalInfoInputSingleField">
                                <h4 className="personalInfoInputFieldHeader">City</h4>
                                <InputGroup>
                                    <Form.Control value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        type="text"
                                        placeholder="City"
                                        aria-required="true"
                                        style={{ borderRadius: "30px" }} />
                                </InputGroup>
                            </div>
                        </div>
                        <div className="rightQuarterOfPersonalInfoField">
                            <div className="editPersonalInfoInputSingleField">
                                <h4 className="personalInfoInputFieldHeader">Post code</h4>
                                <InputGroup>
                                    <Form.Control value={postalCode}
                                        onChange={(e) => setPostalCode(e.target.value)}
                                        type="text"
                                        placeholder="1234 AB"
                                        aria-required="true"
                                        style={{ borderRadius: "30px" }} />
                                </InputGroup>
                            </div>
                            <div className="editPersonalInfoInputSingleField">
                                <h4 className="personalInfoInputFieldHeader">Country</h4>
                                <InputGroup>
                                    <Form.Control value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        type="text"
                                        placeholder="Country"
                                        aria-required="true"
                                        style={{ borderRadius: "30px" }} />
                                </InputGroup>
                            </div>
                        </div> */}
                </Container>
            </Card>
        )
    }

    return (
        <>
            <div className="Full">
                <NavigationBar />
                <Container fluid className="mt-3">
                    <Row>
                        <Col xs lg="3">
                            <ChangePassword />
                        </Col>
                        <Col xs lg="9">
                            <EditPersonalInfo />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}