import './userDashboardComponent.css'
import React from 'react';
import { Row, Col, Container, Card, Button, Table, Badge, Modal, Form } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useRequestWrapper } from '../../middleware';
import { MdOutlineError, MdContentCopy, MdLibraryAddCheck } from "react-icons/md";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import languageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import i18next from 'i18next';

import { authAtom } from '../../state';
import { NavigationBarComponent } from '../';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Localization } from '../Localization/LocalizationComponent';
<Localization />


export function UserDashboard() {


    const userState = useRecoilValue(authAtom);
    const [copiedText, setCopiedText] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [detailedLicense, setDetailedLicense] = useState();
    // const navDropdownTitle = (<MdLanguage color="white" size="2em" />);
    const [licenses, setLicenses] = useState(null);
    const requestWrapper = useRequestWrapper()
    const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/`;
    const myCurrentTime = new Date();
    const { t } = useTranslation();
    const [updateModal, setUpdateModal] = useState(false);

    useEffect(() => {
        if (licenses == null) {

            requestWrapper.get(`${baseUrl}license/user-license/${userState.id}`)
                .then(response => {
                    // var d = new Date(response.expirationDate);
                    // var dd = d.getDate();
                    // var mm = d.getMonth() + 1;
                    // var yy = d.getFullYear();
                    // response.expirationDate = dd + "/" + mm + "/" + yy;
                    setLicenses(response)

                })
                .catch((er) => {
                    setLicenses([])
                    console.log(er)
                });

        }

    })


    function LicenseModal({ onHide, license, show }) {
        const [detailedData, setDetailedData] = useState();

        //get the needed data
        useEffect(() => {
            requestWrapper.get(`${baseUrl}license/${license.id}`)
                .then(response => {
                    if (response.expiresAt) {
                        var displayDate = new Date(Date.parse(response.expiresAt))
                        response.expiresAt = `${displayDate.getDate() + 1}-${displayDate.getMonth() + 1}-${displayDate.getFullYear() + 1}`
                    }
                    setDetailedData(response);
                }).catch((er) => {
                    setLicenses(null)
                    console.log(er)
                });
        }, [license, updateModal])

        if (!detailedData) return null;

        //detailed license modal
        return (
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="DetailedRecordModalHeader">
                    <Modal.Title id="contained-modal-title-vcenter">
                        License: <b>{detailedData.licenseKey}</b>
                        <div className="d-inline-flex ms-1">
                            <CopyToClipboard text={license.licenseKey} onCopy={() => setCopiedText(license.licenseKey)}>
                                {copiedText == license.licenseKey ?
                                    <MdLibraryAddCheck style={{ color: "#4c4e50" }} className="PointOnHover" />
                                    :
                                    <MdContentCopy style={{ color: "#7d93af" }} className="PointOnHover" />
                                }
                            </CopyToClipboard>
                        </div>
                        <div className="d-inline-flex ms-3">
                            {detailedData.active ?
                                <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="success" size="lg">{t('dashboard_active')}</Button>
                                :
                                <>
                                    <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="danger" size="lg">{t('dashboard_inactive')}</Button>
                                </>}
                        </div>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col xs lg="7">
                            <Form.Label>{t('dashboard_product')}</Form.Label>
                            <Form.Control readOnly value={detailedData.productName} />
                        </Col>
                        <Col xs lg="5">
                            <Form.Label>{t('dashboard_reccurence')}</Form.Label>
                            <Form.Control readOnly value={detailedData.recurrence} />
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col xs lg="7">
                            <Form.Label>Email</Form.Label>
                            <Form.Control readOnly value={detailedData.email} />
                        </Col>
                        <Col xs lg="5">
                            <Form.Label>{t('dashboard_purchase_location')}</Form.Label>
                            <Form.Control readOnly value={detailedData.purchaseLocation} />
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col xs lg="3">
                            <Form.Label>{t('dashboard_activations')}</Form.Label>
                            <Form.Control readOnly value={`${detailedData.activations}/${detailedData.maxUses}`} />
                            {detailedData.activations > detailedData.maxUses &&
                                <MdOutlineError color="red" size="1.5em" className="d-flex ms-auto DetailedUserDanger" />
                            }
                        </Col>
                        <Col xs lg="4">
                            <Form.Label>{t('dashboard_expirationdate')}</Form.Label>
                            <Form.Control readOnly value={detailedData.expiresAt ? `${detailedData.expiresAt}` : "-"} />
                        </Col>
                        <Col xs lg="5">
                            <Form.Label>{t('dashboard_deactivated_reason')}</Form.Label>
                            <Form.Control readOnly value={detailedData.endedReason ? `${detailedData.endedReason}` : "-"} />
                        </Col>
                    </Row>



                </Modal.Body>
                <Modal.Footer>
                    <Button className={"btn-" + (detailedData.active ? 'danger' : 'primary')} onClick={() => {
                        console.log('redirected');
                        window.location.href = 'https://techtycoons.gumroad.com/?recommended_by=library'
                    }
                    }>
                        {detailedData.active ? <>{t('dashboard_disable')}</> : <>{t('dashboard_enable')}</>}
                    </Button>
                </Modal.Footer>
            </Modal >
        );
    }


    return (
        <div className="Full" >
            <NavigationBarComponent />
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

                                            <th scope="col">{t('dashboard_licenses')}</th>
                                            <th scope='col' style={{ marginLeft: 10 }}>{t('dashboard_licensekey')}</th>
                                            <th scope="col">{t('dashboard_uses')}</th>
                                            <th scope="col">{t('dashboard_tier')}</th>
                                            <th scope="col">{t('dashboard_payment_period')}</th>
                                            <th scope="col">{t('dashboard_expirationdate')}</th>
                                            <th scope="col">{t('dashboard_status')}</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {licenses ? licenses.map(license => {

                                            return (

                                                <tr key={license.id}>

                                                    <td className="align-middle userDashboardLicenseName" style={{ width: "150px" }}>{license.productName}</td>
                                                    <td className="align-middle Userdashboardlicensekey" style={{ width: "350px" }}>

                                                        {license.licenseKey}
                                                        <CopyToClipboard text={license.licenseKey}
                                                            onCopy={() => setCopiedText(license.licenseKey)}>
                                                            {copiedText == license.licenseKey ?
                                                                <MdLibraryAddCheck style={{ color: "#4c4e50" }} className="ms-2 PointOnHover" />
                                                                :
                                                                <MdContentCopy style={{ color: "#7d93af" }} className="ms-2 PointOnHover" />
                                                            }
                                                        </CopyToClipboard>
                                                    </td >
                                                    <td className="align-middle Userdashboardsmalltext"> {license.activation} / {license.maxUses}</td>
                                                    <td className="align-middle Userdashboardsmalltext">{license.tier}</td>
                                                    <td className="align-middle Userdashboardsmalltext">{license.reaccurence}</td>
                                                    <td className="align-middle Userdashboardsmalltext">{license.expirationDate != null ? license.expirationDate.split('T')[0] : <p className="align-middle">-</p>}</td>
                                                    <td className="align-middle ">{myCurrentTime >= license.expirationDate ? <Badge bg="success">{t('dashboard_active')}</Badge> : <Badge bg="danger">{t('dashboard_inactive')}</Badge>}</td>
                                                    <td className="align-middle" style={{ width: "110px" }}>
                                                        <Button className="p-1" onClick={() => { setModalShow(true); setDetailedLicense(license) }}>{t('dashboard_more')}</Button>
                                                    </td>



                                                </tr>
                                            )
                                        }
                                        ) : null}
                                        {(detailedLicense && modalShow) && <LicenseModal
                                            onHide={() => setModalShow(false)}
                                            license={detailedLicense}
                                            show={modalShow}
                                        />}
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