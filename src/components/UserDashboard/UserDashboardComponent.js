import './userDashboardComponent.css'
import React from 'react';
import { Tabs, Row, Col, Container, Tab, Card, Navbar, Nav, NavDropdown, Glyphicon, Button } from 'react-bootstrap';
import logo from '../../assets/Logo.svg';
import { MdLanguage, MdPerson } from "react-icons/md";

export function UserDashboard() {
    const navDropdownTitle = (<MdLanguage color="white" size="2em" />);
    return (
        <div className="Full" >
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


            <Container fluid className="pt-3">
                <Row>
                    <Col>
                        <Card style={{ borderRadius: 20, backgroundColor: "#EDEFFC" }}>
                            <Card.Header style={{ backgroundColor: '#4e41ba', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                <Card.Title style={{ color: 'white' }}><h2>Welcome Sam</h2></Card.Title>
                            </Card.Header>
                            <Card.Body >

                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Licenses</th>
                                            <th scope="col">Uses</th>
                                            <th scope="col">Tier</th>
                                            <th scope="col">Payment period</th>
                                            <th>expiration date</th>
                                            <th>status</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default UserDashboard;