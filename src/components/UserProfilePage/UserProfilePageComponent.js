import React, { useEffect, useState } from 'react';
import './UserProfilePageComponent.css';
import { MdLanguage, MdPerson } from "react-icons/md";
import { Container, Nav, Navbar, NavDropdown, Button, InputGroup, Form, Card, Col, Row } from "react-bootstrap";
import logo from "../../assets/Logo.svg";
import { useRequestWrapper } from "../../middleware";
import { NavigationBarComponent } from "../"
import { CgCollage } from "react-icons/all";
//import {DashboardBaseComponent} from "../DashboardBase/DashboardBaseComponent";

export function UserProfilePageComponent() {

    const requestWrapper = useRequestWrapper();
    const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/account`;

    function ChangePassword() {
        const [currentPassword, setCurrentPassword] = useState("");
        const [newPassword, setNewPassword] = useState("");
        const [repeatNewPassword, setRepeatNewPassword] = useState("");

        function ChangePasswordAction() {

            if (newPassword !== repeatNewPassword) {
                return alert("Repeat New Password field should be the same as New Password");
            }
            if (newPassword.length < 5) {
                return alert("New Password should be at least 5 digits long")
            }

            requestWrapper.post(`${baseUrl}/change-user-password`,
                {
                    currentPassword: currentPassword,
                    newPassword: newPassword,
                })
                .then(() => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setRepeatNewPassword("");
                    return alert("Password successfully changed!");
                })
                .catch((er) => {
                    return alert(er);
                })
        }

        return (
            <Card style={{ backgroundColor: "#EDEFFC", minHeight: "65vh" }} className="mb-2 mt-4">
                <Container className="mt-4">
                    <h1 className="text-center profilePageHeader">Change password</h1>
                    <Card.Body className="align-middle mt-3">
                        <Row className="my-3">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="******" />
                        </Row>
                        <Row className="my-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="******" />
                        </Row>
                        <Row className="my-3">
                            <Form.Label>Repeat New Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={repeatNewPassword}
                                onChange={(e) => setRepeatNewPassword(e.target.value)}
                                placeholder="******" />
                        </Row>
                        <Row className="text-center justify-content-center mt-4 pt-2">
                            <Col xs="11" sm="10">
                                <Button onClick={() => ChangePasswordAction()}
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

        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [email, setEmail] = useState("");
        const [birthdate, setBirthdate] = useState("");
        const [address, setAddress] = useState("");
        const [city, setCity] = useState("");
        const [postalCode, setPostalCode] = useState("");
        const [country, setCountry] = useState("");
        const [editFormat, setEditFormat] = useState(false);

        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        useEffect(() => {
            requestWrapper.get(`${baseUrl}/get-user-info`)
                .then(response => {
                    setFirstName(response.firstName);
                    setLastName(response.lastName);
                    setEmail(response.email);
                    setBirthdate(response.birthdate);
                    setAddress(response.address);
                    setCity(response.city);
                    setPostalCode(response.postalCode);
                    setCountry(response.country);
                    console.log(response.birthdate);
                }).catch((er) => {
                    console.log(er);
                })
        }, [editFormat]);

        function ChangeUserInfo() {
            if (firstName === "") {
                return alert("First name should be filled in")
            }
            if (lastName === "") {
                return alert("Last name should be filled in")
            }
            if (email === "") {
                return alert("Email should be filled in")
            }
            if (!validateEmail(email))
            {
                return alert("Wrong email format")
            }

            requestWrapper.post(`${baseUrl}/change-user-info`,
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    birthdate: birthdate,
                    address: address,
                    city: city,
                    postalCode: postalCode,
                    country: country
                }).then(() => {
                    setEditFormat(false);
                })
                .catch((er) => {
                    return alert(er);
                })
        }

        return (
            <Card style={{ backgroundColor: "#EDEFFC", minHeight: "65vh", flex: "1" }} className="mt-4">
                <Container className="p-3 pt-4">
                    <Row className="ms-4">
                        <h1 className="profilePageHeader">Personal details</h1>
                    </Row>
                    <Row className="mb-3 ms-2">
                        <Col lg="5" >
                            <Form.Label className="mb-1">First Name</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="text"
                                    readOnly
                                    value={firstName}
                                    style={{ width: "80%" }} />
                                :
                                <Form.Control
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First name"
                                    style={{ width: "80%" }} />
                            }
                        </Col>
                        <Col lg="5" className="offset-xl-1">
                            <Form.Label className="mb-1">Last Name</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="text"
                                    readOnly
                                    value={lastName}
                                    style={{ width: "80%" }} />
                                :
                                <Form.Control
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last name"
                                    style={{ width: "80%" }} />
                            }
                        </Col>
                    </Row>
                    <Row className="ms-2">
                        <Col lg="5" >
                            <Form.Label className="mb-1">Email</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="email"
                                    readOnly
                                    value={email}
                                    style={{width: '80%'}}
                                />
                                :
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    style={{width: '80%'}}
                                />
                            }
                        </Col>
                        <Col lg="5" className="offset-xl-1">
                            <Form.Label className="mb-1">Date of Birth</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="date"
                                    readOnly
                                    value={birthdate}
                                    style={{width: '80%'}}
                                />
                                :
                                <Form.Control
                                    type="date"
                                    value={birthdate}
                                    onChange={(e) => {
                                        setBirthdate(e.target.value);
                                        console.log(birthdate);
                                    }}
                                    style={{width: '80%'}}
                                    placeholder="Country"
                                />
                            }
                        </Col>
                    </Row>
                </Container>

                <Container className="pb-3 p-3" >
                    <hr />
                    <Row className="ms-4">
                        <h1 className="profilePageHeader">Location details</h1>
                    </Row>
                    <Row className="mb-3 ms-2">
                        <Col lg="5">
                            <Form.Label className="mb-1">Address</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="text"
                                    readOnly
                                    value={address}
                                    style={{ width: "80%" }} />
                                :
                                <Form.Control
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Address"
                                    style={{ width: "80%" }} />
                            }
                        </Col>
                        <Col lg="5" className="offset-xl-1">
                            <Form.Label className="mb-1">Postal Code</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="text"
                                    readOnly
                                    value={postalCode}
                                    style={{ width: "80%" }} />
                                :
                                <Form.Control
                                    type="text"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    placeholder="1234 AB"
                                    style={{ width: "80%" }} />
                            }
                        </Col>
                    </Row>
                    <Row className="ms-2">
                        <Col lg="5">
                            <Form.Label className="mb-1">City</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="text"
                                    readOnly
                                    value={city}
                                    style={{ width: "80%" }} />
                                :
                                <Form.Control
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="City"
                                    style={{ width: "80%" }} />
                            }
                        </Col>
                        <Col lg="5" className="offset-xl-1">
                            <Form.Label className="mb-1">Country</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="text"
                                    readOnly
                                    value={country}
                                    style={{ width: "80%" }} />
                                :
                                <Form.Control
                                    type="text"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Country"
                                    style={{ width: "80%" }} />
                            }
                        </Col>
                    </Row>
                    <Row fluid className="d-flex mt-4 pt-2">
                        <Col sm="11" className="d-flex justify-content-between">
                            {editFormat ?
                                <Col>
                                    <Button
                                        onClick={() => setEditFormat(false)}
                                        style={{
                                            borderRadius: "30px",
                                            backgroundColor: "#FA153E",
                                            color: "#FFFFFF",
                                            margin: "20px 0px 0px 0px",
                                            fontSize: "22px",
                                            border: "transparent",
                                        }}>
                                        Cancel
                                    </Button>
                                </Col>
                                :
                                <> </>
                            }

                            <Col className="d-flex">
                                {!editFormat ?
                                    <Button className="d-flex ms-auto" onClick={() => setEditFormat(true)}
                                        style={{
                                            borderRadius: "30px",
                                            backgroundColor: "#EFA9AE",
                                            color: "#02021E",
                                            margin: "20px 0px 0px 0px",
                                            fontSize: "22px",
                                            border: "transparent"
                                        }}>Edit information</Button>
                                    :
                                    <Button className="d-flex ms-auto" onClick={() => {
                                        ChangeUserInfo();
                                    }}
                                        style={{
                                            borderRadius: "30px",
                                            backgroundColor: "#EFA9AE",
                                            color: "#02021E",
                                            margin: "20px 0px 0px 0px",
                                            fontSize: "22px",
                                            border: "transparent"
                                        }}>Save changes</Button>}
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </Card>
        )
    }

    return (
        <>
            <div className="Full">
                <NavigationBarComponent />
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

export default UserProfilePageComponent;