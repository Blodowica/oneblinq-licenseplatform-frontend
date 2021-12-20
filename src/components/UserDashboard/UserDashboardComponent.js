import './userDashboardComponent.css'
import React from 'react';
import { Tabs, Row, Col, Container, Tab, Card, Navbar, Nav, NavDropdown, Glyphicon, Button, Table, Badge } from 'react-bootstrap';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useRequestWrapper } from '../../middleware';
import logo from '../../assets/Logo.svg';
import { MdLanguage, MdPerson } from "react-icons/md";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import languageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import i18next from 'i18next';

import { authAtom } from '../../state';
import { NavigationBarComponent } from '../';

import { Localization } from '../Localization/LocalizationComponent';
<Localization />
i18n
    .use(initReactI18next)
    .use(languageDetector)
    .use(HttpApi)

    .init({
        //if you're using a language detector don't define the lng option
        fallbackLng: "en",

        //language detection
        detection: {
            order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
            caches: ['cookie'],
        },

        //i18next http backend
        backend: {
            loadPath: '../../assets/locales/{{lng}}/translation.json'

        },

        react: { useSuspense: false }
    })




export function UserDashboard() {

    const userState = useRecoilValue(authAtom);

    const navDropdownTitle = (<MdLanguage color="white" size="2em" />);
    const [licenses, setLicenses] = useState(null);
    const requestWrapper = useRequestWrapper()
    const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/`;
    const myCurrentTime = new Date();
    const { t } = useTranslation();


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
            <NavigationBarComponent />
            <Container fluid className="pt-3">
                <Row>
                    <Col>
                        <Card style={{ backgroundColor: "#ff000000", borderWidth: "0px" }}>
                            <Card.Header style={{ backgroundColor: "#6240d7" }} className="UserDashboardCardHeader text-white">
                                <div>
                                    <Card.Title style={{ color: 'white', float: 'left', marginTop: '0.2%' }}><h2>{t('dashboard_welocme')} {userState.firstName}</h2></Card.Title>

                                </div>
                            </Card.Header>
                            <Card.Body style={{ backgroundColor: "white" }}>

                                <Table striped hover responsive>
                                    <thead>
                                        <tr>
                                            <th scope="col">{t('dashboard_licenses')}</th>
                                            <th scope="col">{t('dashboard_uses')}</th>
                                            <th scope="col">{t('dashboard_tier')}</th>
                                            <th scope="col">{t('dashboard_payment_period')}</th>
                                            <th scope="col">{t('dashboard_expirationdate')}</th>
                                            <th scope="col">{t('dashboard_status')}</th>

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
                                                    <td className="align-middle">{myCurrentTime >= license.expirationDate ? <Badge bg="success">{t('dashboard_active')}</Badge> : <Badge bg="danger">{t('dashboard_inactive')}</Badge>}</td>



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