import './userDashboardComponent.css'
import React from 'react';
import { Tabs, Row, Col, Container, Tab, Card, Navbar, Nav, NavDropdown, Glyphicon, Button, Table, Badge } from 'react-bootstrap';

import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useRequestWrapper } from '../../middleware';
import logo from '../../assets/Logo.svg';
import { MdLanguage, MdPerson } from "react-icons/md";

import { authAtom } from '../../state';
import {NavigationBarComponent} from '../';

export function UserDashboard() {

    const userState = useRecoilValue(authAtom);

    const navDropdownTitle = (<MdLanguage color="white" size="2em" />);
    const [licenses, setLicenses] = useState(null);
    const requestWrapper = useRequestWrapper()
    const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/`;
    const myCurrentTime = new Date();

    useEffect(() => {
        if (licenses == null) {

            requestWrapper.get(`${baseUrl}license/user-license/${userState.id}`)
                .then(response => {
                    // var d = new Date(response.expirationDate);
                    // var dd = d.getDate();
                    // var mm = d.getMonth() + 1;
                    // var yy = d.getFullYear();
                    // response.expirationDate = dd + "/" + mm + "/" + yy;
                    console.log(response)
                    setLicenses(response)

                })
                .catch((er) => {
                    setLicenses([])
                    console.log(er)
                });

        }

    })


    return (
        <div className="Full" >
            <NavigationBarComponent/>
            <Container fluid className="pt-3">
                <Row>
                    <Col>
                        <Card style={{ backgroundColor: "#ff000000", borderWidth: "0px" }}>
                            <Card.Header style={{ backgroundColor: "#6240d7" }} className="UserDashboardCardHeader text-white">
                                <div>
                                    <Card.Title style={{ color: 'white', float: 'left', marginTop: '0.2%' }}><h2>Welcome {userState.firstName}</h2></Card.Title>

                                </div>
                            </Card.Header>
                            <Card.Body style={{ backgroundColor: "white" }}>

                                <Table striped hover responsive>
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

                                        {licenses ? licenses.map(license => {

                                            return (

                                                <tr key={license.id}>
                                                    <td className="align-middle" style={{ width: "100px" }}>{license.productName}</td>
                                                    <td className="align-middle"> 1 / {license.maxUses}</td>
                                                    <td className="align-middle">{license.tier}</td>
                                                    <td className="align-middle">{license.reaccurence}</td>
                                                    <td className="align-middle">{license.expirationDate != null ? license.expirationDate.split('T')[0] : <p className="align-middle">-</p>}</td>
                                                    <td className="align-middle">{myCurrentTime >= license.expirationDate ? <Badge bg="success">Active</Badge> : <Badge bg="danger">Unactive</Badge>}</td>



                                                </tr>
                                            )
                                        }
                                        ) : null}
                                    </tbody>
                                </Table>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default UserDashboard;