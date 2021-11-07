import './LicenseTableComponent.css'
import { Table, Button, Badge, Modal, } from 'react-bootstrap';
import { licenseAtom } from '../../state';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useRequestWrapper } from '../../middleware';


function LicenseModal({ onClose, license, isShown }) {
  return (
    <Modal
      show={isShown}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          {license.licenseId}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onClose()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function LicenseTableComponent() {
  const [licenses, setLicenses] = useRecoilState(licenseAtom);
  const [modalShow, setModalShow] = useState(false);
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
                <Button variant="primary" onClick={() => setModalShow(true)}>Details</Button>{' '}
              </td>
              <LicenseModal
                key={license.licenseId}
                onClose={() => setModalShow(false)}
                license={license}
                isShown={modalShow}

              />
            </tr>
          )
        })}
      </tbody>

    </Table>
  )
}

export default LicenseTableComponent;