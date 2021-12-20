import React, { useEffect, useState } from 'react';
import './UserProfilePageComponent.css';
// import { Container, Checkbox, Button, Form, Card, Col, Row } from "react-bootstrap";
// why cant I get Checkbox from React-bootstrap? I saw an example on stackoverflow
import { Container, Button, Form, Card, Col, Row } from "react-bootstrap";
import { useRequestWrapper } from "../../middleware";
import { NavigationBarComponent } from "../"
import { useRecoilValue } from "recoil";
import { authAtom } from "../../state";
import jwt_decode from "jwt-decode";
import { useTranslation, initReactI18next } from "react-i18next";

export function UserProfilePageComponent() {


    const requestWrapper = useRequestWrapper();
    const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/account`;
    const authState = useRecoilValue(authAtom);
    const { t } = useTranslation();
    let role = jwt_decode(authState.token).role;
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
            //, height: '70%'
            <Card style={{ backgroundColor: "#EDEFFC", minHeight: "55vh" }} className="mt-3 mt-lg-4">
                <Container className="mt-4">
                    <h1 className="text-center profilePageHeader">{t('dashboard_changepassword')}</h1>
                    <Card.Body className="align-middle mt-2">
                        <Row className="my-2">
                            <Form.Label>{t('dashboard_currentpassword')}</Form.Label>
                            <Form.Control
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="******" />
                        </Row>
                        <Row className="my-2">
                            <Form.Label>{t('dashboard_newpassword')}</Form.Label>
                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="******" />
                        </Row>
                        <Row className="my-2">
                            <Form.Label>{t('dashboard_repeatcurrentpassword')}</Form.Label>
                            <Form.Control
                                type="password"
                                value={repeatNewPassword}
                                onChange={(e) =>
                                    setRepeatNewPassword(e.target.value)
                                }

                                placeholder="******" />
                        </Row>
                        <Row className="text-center justify-content-center mt-1 pt-1">
                            <Col xs="11" sm="10">
                                <Button onClick={() => ChangePasswordAction()}
                                    style={{
                                        borderRadius: "30px",
                                        backgroundColor: "#EFA9AE",
                                        color: "#02021E",
                                        margin: "20px 0px 0px 0px",
                                        fontSize: "22px",
                                        border: "transparent"
                                    }}>{t('dashboard_changepassword')}</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Container>
            </Card>
        )
    }

    function SetNotifications() {

        const [abuseNotifications, setAbuseNotifications] = useState("");

        useEffect(() => {
            requestWrapper.get(`${baseUrl}/get-notification-decisions`)
                .then(response => {
                    setAbuseNotifications(response.abuseNotifications)
                })
                .catch(er => {
                    console.log(er)
                })
        }, [false])

        function SaveSetNotifications() {
            requestWrapper.post(`${baseUrl}/set-notification-decisions`, {
                abuseNotifications: abuseNotifications
            })
                .catch(err => {
                    alert(err.message)
                })
        }

        return (
            // , height: '28.75%'
            <Card style={{ backgroundColor: "#EDEFFC", minHeight: "15vh", flex: "1" }} className="mt-3 mt-lg-1">
                <Card.Body className="align-middle p-3 pt-3">
                    <Row className="text-center">
                        <h1 className="profilePageHeader">{t('dashboard_notification')}</h1>
                    </Row>
                    <Col className="mt-2">
                        <Row className="ms-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={abuseNotifications}
                                    onChange={(e) => setAbuseNotifications(e.target.checked)}
                                    id="abuseNotificationsCheck"
                                />
                                <label className="form-check-label" htmlFor="abuseNotificationsCheck">
                                    {t('personalpage_notificationmessage')}
                                </label>
                            </div>
                        </Row>
                        {/*<Checkbox >Some text</Checkbox>*/}
                        <Row className="text-center justify-content-center my-1 pt-1">
                            <Col xs="11" sm="10" className="text-center">
                                <Button className="text-center justify-content-center mt-2 mb-1" onClick={() => SaveSetNotifications()}
                                    style={{
                                        borderRadius: "30px",
                                        backgroundColor: "#EFA9AE",
                                        color: "#02021E",
                                        fontSize: "22px",
                                        border: "transparent"
                                    }}>{t('personalpage_savechanges')}</Button>
                            </Col>
                        </Row>
                    </Col>
                </Card.Body>
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
            if (!validateEmail(email)) {
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
            // height: "100%",
            <Card style={{ backgroundColor: "#EDEFFC", flex: "1" }} className="my-3 mb-md-0 mt-lg-4 me-2">
                <Container className="p-3 pt-4">
                    <Row className="ms-4">
                        <h1 className="profilePageHeader">{t('dashboard_personaldetails')}</h1>
                    </Row>
                    <Row className="my-2 my-lg-3 ms-2">
                        <Col lg="5" >
                            <Form.Label className="mb-1">{t('dashboard_firstname')}</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="text"
                                    readOnly
                                    value={firstName}
                                    placeholder="First name"
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
                        <Col lg="5" className="offset-xl-1 mt-2 my-lg-0">
                            <Form.Label className="mb-1">{t('dashboard_lastname')}</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="text"
                                    readOnly
                                    value={lastName}
                                    placeholder="Last name"
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
                            <Form.Label className="mb-1">{t('dashboard_email')}</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="email"
                                    readOnly
                                    value={email}
                                    placeholder="email@gmail.com"
                                    style={{ width: '80%' }}
                                />
                                :
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    placeholder="email@gmail.com"
                                    style={{ width: '80%' }}
                                />
                            }
                        </Col>
                        <Col lg="5" className="offset-xl-1 mt-2 my-lg-0">
                            <Form.Label className="mb-1">{t('dashboard_dateofbirth')}</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="date"
                                    readOnly
                                    value={birthdate}
                                    style={{ width: '80%' }}
                                />
                                :
                                <Form.Control
                                    type="date"
                                    value={birthdate}
                                    onChange={(e) => {
                                        setBirthdate(e.target.value);
                                        console.log(e.target.value);
                                    }}
                                    style={{ width: '80%' }}
                                />
                            }
                        </Col>
                    </Row>
                </Container>

                <Container className="pb-3 p-3">
                    <hr />
                    <Row className="ms-4">
                        <h1 className="profilePageHeader">{t('dashboard_locationdetails')}</h1>
                    </Row>
                    <Row className="my-2 my-lg-3 ms-2">
                        <Col lg="5">
                            <Form.Label className="mb-1">{t('dashboard_address')}</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="text"
                                    readOnly
                                    value={address}
                                    placeholder={t('dashboard_address')}
                                    style={{ width: "80%" }} />
                                :
                                <Form.Control
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder={t('dashboard_address')}
                                    style={{ width: "80%" }} />
                            }
                        </Col>
                        <Col lg="5" className="offset-xl-1 mt-2 my-lg-0">
                            <Form.Label className="mb-1">{t('dashboard_postalcode')}</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="text"
                                    readOnly
                                    value={postalCode}
                                    placeholder="1234 AB"
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
                            <Form.Label className="mb-1">{t('dashboard_city')}</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="text"
                                    readOnly
                                    value={city}
                                    placeholder="City"
                                    style={{ width: "80%" }} />
                                :
                                <Form.Control
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder={t('dashboard_city')}
                                    style={{ width: "80%" }} />
                            }
                        </Col>
                        <Col lg="5" className="offset-xl-1 mt-2 my-lg-0">
                            <Form.Label className="mb-1">{t('dashboard_country')}</Form.Label>
                            {!editFormat ?
                                <Form.Control
                                    type="text"
                                    readOnly
                                    value={country}
                                    placeholder="Country"
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
                                        {t('dashboard_cancel')}
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
                                            margin: "15px 0px 0px 0px",
                                            fontSize: "22px",
                                            border: "transparent"
                                        }}>{t('dashboard_editinformation')}</Button>
                                    :
                                    <Button className="d-flex ms-auto" onClick={() => {
                                        ChangeUserInfo();
                                    }}
                                        style={{
                                            borderRadius: "30px",
                                            backgroundColor: "#EFA9AE",
                                            color: "#02021E",
                                            margin: "15px 0px 0px 0px",
                                            fontSize: "22px",
                                            border: "transparent"
                                        }}>{t('personalpage_savechanges')}</Button>}
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
                    <Row style={{ maxHeight: '75hv' }}>
                        <Col xs md="4" lg="3">
                            <ChangePassword />
                            {
                                (role === 'Admin') ?
                                    <SetNotifications />
                                    :
                                    <div />
                            }
                        </Col >
                        <Col xs md="8" lg="9">
                            <EditPersonalInfo />
                        </Col>
                    </Row >
                </Container >
            </div >
        </>
    )
}

export default UserProfilePageComponent;