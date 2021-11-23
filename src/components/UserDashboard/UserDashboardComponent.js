import './userDashboardComponent.css'
import React from 'react';
import { Tabs, Row, Col, Container, Tab, Card, Navbar, Nav, NavDropdown, Glyphicon, Button } from 'react-bootstrap';
import logo from '../../assets/Logo.svg';
import { MdLanguage, MdPerson } from "react-icons/md";
import Badge from 'react-bootstrap/Badge';

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
                                <div>
                                    <Card.Title style={{ color: 'white', float: 'left', marginTop: '0.2%' }}><h2>Welcome Sam</h2></Card.Title>
                                    <input type="text" placeholder="Search.." style={{ float: 'right', marginTop: '0.6%' }}></input>
                                </div>
                            </Card.Header>
                            <Card.Body >

                                <table class="table ">
                                    <thead>
                                        <tr>
                                            <th scope="col">Licenses</th>
                                            <th scope="col">Uses</th>
                                            <th scope="col">Tier</th>
                                            <th scope="col">Payment period</th>
                                            <th scope="col">expiration date</th>
                                            <th scope="col">status</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>

                                            <td>
                                                <div>
                                                    <img className="LicenseIcon" src="https://public-files.gumroad.com/variants/jp3qnebo1mc51i3kdxr1kc034w1u/f5e45d48b5beedfba90b886151ecf5d16b1eaccf659430a07111ee92f0d5a6e2"></img>
                                                    <h3 className="LicenseText">Forms</h3>
                                                    {/* <a className="LicenseLink"> oneblinq.gumroad.com/I/wdAwEP</a> */}
                                                </div>
                                            </td>
                                            <td>1/2</td>
                                            <td>small team</td>
                                            <td>Monthly</td>
                                            <td>-</td>
                                            <td><Badge bg="success">Active</Badge></td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div>
                                                    <img className="LicenseIcon" src="https://public-files.gumroad.com/variants/jp3qnebo1mc51i3kdxr1kc034w1u/f5e45d48b5beedfba90b886151ecf5d16b1eaccf659430a07111ee92f0d5a6e2"></img>
                                                    <h2 className="LicenseText">Lines</h2>
                                                    {/* <a className="LicenseLink"> text</a> */}
                                                </div>
                                            </td>
                                            <td>3/1</td>
                                            <td>FreeLancer</td>
                                            <td>Yearly</td>
                                            <td>2021-11-15</td>
                                            <td><Badge bg="danger">Deactivated</Badge></td>

                                        </tr>
                                        <tr>
                                            <th scope="row"></th>
                                            <td></td>
                                            <td> </td>
                                            <td></td>
                                        </tr>

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