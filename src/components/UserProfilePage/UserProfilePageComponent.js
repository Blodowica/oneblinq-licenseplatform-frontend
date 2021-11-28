import React, {useState} from 'react';
import './UserProfilePageComponent.css';
import {MdLanguage, MdPerson} from "react-icons/md";
import {Container, Nav, Navbar, NavDropdown, Button, InputGroup, Form, Card, Col, Row} from "react-bootstrap";
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
            <div id="changePasswordField">
                <Form>
                    <h1 className="changePasswordHeader">Change password</h1>

                    <div className="changePasswordInputField">
                        <h3>Current password</h3>
                        <InputGroup className="passwordInputBox" style={{width: "50%", margin: "auto"}}>
                            {/*<InputGroup.Text>Current password</InputGroup.Text>*/}
                            <Form.Control
                                          value={currentPassword}
                                          onChange={(e) => setCurrentPassword(e.target.value)}
                                          type="password"
                                          placeholder="******"
                                          style={{borderRadius: "30px"}}
                            />
                        </InputGroup>
                    </div>

                    <div className="changePasswordInputField">
                    <h3>New password</h3>
                        <InputGroup className="passwordInputBox" style={{width: "50%", margin: "auto"}}>
                            {/*<InputGroup.Text>Current password</InputGroup.Text>*/}
                            <Form.Control
                                          value={newPassword}
                                          onChange={(e) => setNewPassword(e.target.value)}
                                          type="password"
                                          placeholder="******"
                                          style={{borderRadius: "30px"}}/>
                        </InputGroup>
                    </div>

                    <div className="changePasswordInputField">
                        <h3>Repeat new password</h3>
                        <InputGroup className="passwordInputBox" style={{width: "50%", margin: "auto"}}>
                            {/*<InputGroup.Text>Current password</InputGroup.Text>*/}
                            <Form.Control
                                          value={repeatNewPassword}
                                          onChange={(e) => setRepeatNewPassword(e.target.value)}
                                          type="password"
                                          placeholder="******"
                                          style={{borderRadius: "30px"}}/>
                        </InputGroup>
                    </div>
                    <Button onClick={() => ChangePassword()}
                            style={{borderRadius: "30px", backgroundColor: "#EFA9AE", color: "#02021E", margin: "80px 0px 0px 0px", fontSize: "22px", border: "transparent"}}>Change password</Button>
                </Form>
            </div>
        )
    }

    function EditPersonalInfo() {

        return (
            <Card id="editPersonalInfoField" style={{ backgroundColor: "#ff000000"}}>
                <Form>
                    <div className="halfOfPersonalInfoField">
                        <h1>Personal details</h1>
                        <Row>
                            <Col xs lg="7">
                                <Form.Label>First name</Form.Label>
                                <Form.Control readOnly value="First name hkjlk;l" />
                            </Col>
                            <Col xs lg="5">
                                <Form.Label>Email</Form.Label>
                                <Form.Control readOnly value="Email @uygknlk" />
                            </Col>
                        </Row>
                        {/*<div className="leftQuarterOfPersonalInfoField">*/}
                        {/*    <div className="editPersonalInfoInputSingleField">*/}
                        {/*        <h4 className="personalInfoInputFieldHeader">First name</h4>*/}
                        {/*        <InputGroup style={{width: "60%"}}>*/}
                        {/*            <Form.Control value={firstName}*/}
                        {/*                          onChange={(e) => setFirstName(e.target.value)}*/}
                        {/*                          type="text"*/}
                        {/*                          placeholder="First name"*/}
                        {/*                          aria-required="true"*/}
                        {/*                          style={{borderRadius: "30px"}}/>*/}
                        {/*        </InputGroup>*/}
                        {/*    </div>*/}
                        {/*    <div className="editPersonalInfoInputSingleField">*/}
                        {/*        <h4 className="personalInfoInputFieldHeader">Last name</h4>*/}
                        {/*        <InputGroup>*/}
                        {/*            <Form.Control value={lastName}*/}
                        {/*                          onChange={(e) => setLastName(e.target.value)}*/}
                        {/*                          type="text"*/}
                        {/*                          placeholder="Last name"*/}
                        {/*                          aria-required="true"*/}
                        {/*                          style={{borderRadius: "30px"}}/>*/}
                        {/*        </InputGroup>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="rightQuarterOfPersonalInfoField">
                            <div className="editPersonalInfoInputSingleField">
                                <h4 className="personalInfoInputFieldHeader">Email</h4>
                                <InputGroup>
                                    <Form.Control value={email}
                                                  onChange={(e) => setEmail(e.target.value)}
                                                  type="email"
                                                  placeholder="Email"
                                                  aria-required="true"
                                                  style={{borderRadius: "30px"}}/>
                                </InputGroup>
                            </div>
                            <div className="editPersonalInfoInputSingleField">
                                <h4 className="personalInfoInputFieldHeader">Date of birth</h4>
                                <InputGroup>
                                    <Form.Control value={birthdate}
                                                  onChange={(e) => setBirthdate(e.target.value)}
                                                  type="date"
                                                  placeholder="dd-mm-yyyy"

                                                  style={{borderRadius: "30px"}}/>
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                    {/*<div id="divideLine"/>*/}
                    <div className="halfOfPersonalInfoField">
                        <h1>Location details</h1>
                        <div className="leftQuarterOfPersonalInfoField">
                            <div className="editPersonalInfoInputSingleField">
                                <h4 className="personalInfoInputFieldHeader">Address</h4>
                                <InputGroup>
                                    <Form.Control value={address}
                                                  onChange={(e) => setAddress(e.target.value)}
                                                  type="text"
                                                  placeholder="Address"
                                                  aria-required="true"
                                                  style={{borderRadius: "30px"}}/>
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
                                                  style={{borderRadius: "30px"}}/>
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
                                                  style={{borderRadius: "30px"}}/>
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
                                                  style={{borderRadius: "30px"}}/>
                                </InputGroup>
                            </div>
                        </div>
                    </div>
                </Form>
            </Card>
        )
    }

    return (
        <>
            <div className="Full">
                <NavigationBar/>
                <div id="mainProfileField">
                    <ChangePassword/>
                    <EditPersonalInfo/>
                </div>
            </div>
        </>
    )
}