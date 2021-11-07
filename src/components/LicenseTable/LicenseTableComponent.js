import './LicenseTableComponent.css'
import { Table, Button, Badge, Modal, Row, Col, Card } from 'react-bootstrap';
import { licenseAtom } from '../../state';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useRequestWrapper } from '../../middleware';


function LicenseModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         License: {props.license.licenseKey}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body fluid>
        <Row>
          <Col xs lg="7">
            <p>Product</p>
            <Card body>Forms</Card>
          </Col>
          <Col xs lg="5">
            <p>Reccurance</p>
            <Card body>Monthly</Card>
          </Col>
        </Row>

        <Row>
          <Col xs lg="7">
            <p>Email</p>
            <Card body>{props.license.email}</Card>
          </Col>
          <Col xs lg="5">
            <p>Purchase Location</p>
            <Card body>Netherlands</Card>
          </Col>
        </Row>

        <Row>
          <Col xs lg="3">
            <p>Activations</p>
            <Card body>1/4</Card>
          </Col>
          <Col xs lg="4">
            <p>Expiration Date</p>
            <Card body>22-11-2021</Card>
          </Col>
          <Col xs lg="5">
            <p>Deactivation Reason</p>
            <Card body>Chargeback</Card>
          </Col>
        </Row>

        <Row>
          <Col xs lg="12">
            <p>Activation Log</p>
            <Card body>.......</Card>
          </Col>
        </Row>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => props.onHide()}>Deactivate</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function LicenseTableComponent() {
  const [licenses, setLicenses] = useRecoilState(licenseAtom);
  const [modalShow, setModalShow] = useState(false);
  const [detailedLicense, setDetailedLicense] = useState();
  const requestWrapper = useRequestWrapper()
  const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/License`;


  useEffect(() => {
    requestWrapper.get(`${baseUrl}`)
      .then(licenses => {
        setLicenses(licenses);
        console.log(licenses);
      }).catch((er) => {
        setLicenses(null)
        console.log(er)
      });
  }, [])

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>License</th>
          <th>Email</th>
          <th>Activations</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {licenses && licenses.map(license => {
          return (
            <tr key={licenses.licenseId}>
              <td>{license.licenseId}</td>
              <td>{license.licenseKey}</td>
              <td>{license.email}</td>
              <td>{`${license.activations}/${license.maxUses}`}</td>
              <td>
                {license.active ? (
                  <Badge bg="success">Active</Badge>

                ) : (
                  <Badge bg="danger">Inactive</Badge>
                )}
              </td>
              <td>
                <Button variant="primary" onClick={() => {setModalShow(true);setDetailedLicense(license)}}>Details</Button>{' '}
              </td>
            </tr>
          )
        })}
            {detailedLicense && <LicenseModal
                onHide={() => setModalShow(false)}
                license={detailedLicense}
                show={modalShow}
              />}
              
      </tbody>

    </Table>
  )
}

export default LicenseTableComponent;