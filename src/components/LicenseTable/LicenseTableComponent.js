import './LicenseTableComponent.css'
import { Table, Button, Badge, Modal, Row, Col, Card, Form } from 'react-bootstrap';
import { licenseAtom } from '../../state';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useRequestWrapper } from '../../middleware';
import { MdOutlineError } from "react-icons/md";



export function LicenseTableComponent() {
  const [licenses, setLicenses] = useRecoilState(licenseAtom);
  const [searchString, setSearchString] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [detailedLicense, setDetailedLicense] = useState();
  const requestWrapper = useRequestWrapper()
  const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/License`;


  useEffect(() => {
    requestWrapper.get(`${baseUrl}`)
      .then(licenses => {
        licenses.map(license => {
          let fullDesc = ""
          Object.keys(license).forEach((key) => {
            if (key == "active")
              fullDesc += license[key] ? "Active" : "Inactive"
            else if (key == "activations")
              return;
            else if (key == "activations" || key == "maxUses")
              fullDesc += `${license.activations}/${license.maxUses}`
            else
              fullDesc += license[key]
          })
          license.fullDesc = fullDesc.toLowerCase();
        })
        setLicenses(licenses);
        console.log(licenses);
      }).catch((er) => {
        setLicenses(null)
        console.log(er)
      });
  }, [])


  function LicenseModal({ onHide, license, show }) {
    const [detailedData, setDetailedData] = useState();

    useEffect(() => {
      requestWrapper.get(`${baseUrl}/${license.licenseId}`)
        .then(response => {
          var displayDate = new Date(response.expiresAt)
          response.expiresAt = `${displayDate.getDate()}-${displayDate.getMonth()}-${displayDate.getFullYear()}`


          setDetailedData(response);
        }).catch((er) => {
          setLicenses(null)
          console.log(er)
        });
    }, [license])

    if (!detailedData) return null;

    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            License: {detailedData.licenseKey} - {" "}
            <span style={{ color: detailedData.active ? "green" : "red" }}>
              {detailedData.active ?
                <>
                  <span style={{ backgroundColor: "green", padding: 4, borderRadius: 7 }}>
                    <span style={{ color: "white" }}>Active</span>
                  </span>
                </>
                :
                <>
                  <span style={{ backgroundColor: "red", padding: 2, borderRadius: 7 }}>
                    <span style={{ color: "white" }}>Inactive</span>
                  </span>
                </>}
            </span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col xs lg="7">
              <Form.Label>Product</Form.Label>
              <Form.Control readOnly value={detailedData.productName} />
            </Col>
            <Col xs lg="5">
              <Form.Label>Reccurance</Form.Label>
              <Form.Control readOnly value={detailedData.recurrence} />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col xs lg="7">
              <Form.Label>Email</Form.Label>
              <Form.Control readOnly value={detailedData.email} />
            </Col>
            <Col xs lg="5">
              <Form.Label>Purchase Location</Form.Label>
              <Form.Control readOnly value={detailedData.purchaseLocation} />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col xs lg="3">
              <Form.Label>Activations</Form.Label>
              <Form.Control readOnly value={`${detailedData.activations}/${detailedData.maxUses}`} />
            </Col>
            <Col xs lg="4">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control readOnly value={detailedData.expiresAt ? `${detailedData.expiresAt}` : "-"} />
            </Col>
            <Col xs lg="5">
              <Form.Label>Deactivation Reason</Form.Label>
              <Form.Control readOnly value={detailedData.endedReason ? `${detailedData.endedReason}` : "-"} />
            </Col>
          </Row>

          <Row>
            <Col xs lg="12">
              <Form.Label>Activation Log</Form.Label>
              <Form.Control as="textarea" value={detailedData.activationlogs && detailedData.activationlogs.map(x => x.message).join('\n')} readOnly rows={3} />
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => onHide()}>Deactivate</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  return (
    <>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Col sm="6" lg="3">
          <Form.Control onChange={(e) => setSearchString(e.target.value.toLowerCase())} value={searchString} placeholder="Search bar" />
        </Col>
      </Form.Group>

      <Table striped bordered hover>
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
            if (searchString && license.fullDesc.search(searchString) == -1) return;
            return (
              <tr>
                <td>{license.licenseId}</td>
                <td>{license.licenseKey}</td>
                <td>{license.email}</td>
                <td>
                  <span className="d-flex align-items-md-center justify-content-between">
                    {`${license.activations}/${license.maxUses}`}
                    {
                      license.activations > license.maxUses ? <MdOutlineError color="red" size="1.5em" /> : ""
                    }
                  </span>
                </td>
                <td>
                  {license.active ? (
                    <Badge bg="success">Active</Badge>

                  ) : (
                    <Badge bg="danger">Inactive</Badge>
                  )}
                </td>
                <td>
                  <Badge className="btn" onClick={() => { setModalShow(true); setDetailedLicense(license) }}>Details</Badge>
                </td>
              </tr>
            )
          }
          )}
          {detailedLicense && <LicenseModal
            onHide={() => setModalShow(false)}
            license={detailedLicense}
            show={modalShow}
          />}
        </tbody>

      </Table>
    </>
  )
}

export default LicenseTableComponent;