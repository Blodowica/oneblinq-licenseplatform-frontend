import './LicenseTableComponent.css'
import { Table, Button, Badge, Modal, Row, Col, Card, Form, Container } from 'react-bootstrap';
import { licenseAtom } from '../../state';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useRequestWrapper } from '../../middleware';
import { MdOutlineError, MdOutlineManageSearch, MdContentCopy, MdLibraryAddCheck } from "react-icons/md";
import { CopyToClipboard } from 'react-copy-to-clipboard';

export function LicenseTableComponent() {
  const [licenses, setLicenses] = useRecoilState(licenseAtom);
  const [modalShow, setModalShow] = useState(false);
  const [detailedLicense, setDetailedLicense] = useState();
  const requestWrapper = useRequestWrapper()
  const [copiedText, setCopiedText] = useState("");
  const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/License`;

  //Filtering
  const [detailedSearch, setDetailedSearch] = useState(false);
  const [recordsCount, setRecordsCount] = useState(25);
  const [searchString, setSearchString] = useState("");

  const [searchId, setSearchId] = useState("");
  const [searchLicense, setSearchLicense] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchActivations, setSearchActivations] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  //pagination
  const [paginationPages, setPaginationPages] = useState(500);
  const [paginationPage, setPaginationPage] = useState(1);

  //get all records and set a fullDesc value for searching
  //TODO: Remove the fullDesc logic, this will happen on server side in the future 
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


  //detailed license display
  function LicenseModal({ onHide, license, show }) {
    const [detailedData, setDetailedData] = useState();

    //get the needed data
    useEffect(() => {
      requestWrapper.get(`${baseUrl}/${license.licenseId}`)
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
    }, [license])

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
                <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="success" size="lg">Active</Button>
                :
                <>
                  <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="danger" size="lg">Inactive</Button>
                </>}
            </div>
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
              <Form.Control as="textarea" value={detailedData.activationLogs && detailedData.activationLogs.map(x => x.message).join('\n\n')} readOnly rows={5} />
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => onHide()}>Deactivate</Button>
        </Modal.Footer>
      </Modal>
    );
  }


  //table render
  return (
    <>
      {/* search/filtering bar */}
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Col lg="5" sm="12">
          <Row className="d-flex">
            <Col xs="2" md="3" style={{ paddingRight: "5px", width: "95px" }}>
              <Form.Select onChange={(e) => setRecordsCount(e.target.value)}>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </Form.Select>
            </Col>
            <Col style={{ paddingLeft: "0px", width: "400px", maxWidth: "450px" }} className="d-flex align-items-center">
              <Form.Control onChange={(e) => setSearchString(e.target.value.toLowerCase())} value={searchString} placeholder="Search bar" />
              {detailedSearch ?
                <MdOutlineManageSearch size="35px" className="ms-1 DetailedSearchIcon DetailedSearchIconOn" onClick={() => setDetailedSearch(!detailedSearch)} />
                :
                <MdOutlineManageSearch size="35px" className="ms-1 DetailedSearchIcon" onClick={() => setDetailedSearch(!detailedSearch)} />
              }
            </Col>
          </Row>
        </Col>
      </Form.Group>

      <Table striped bordered hover responsive>
        <thead>
          {detailedSearch ?
            <tr>
              <th><Form.Control type="number" style={{ width: "80px" }} onChange={(e) => setSearchId(e.target.value)} value={searchId} placeholder="ID" /></th>
              <th><Form.Control onChange={(e) => setSearchLicense(e.target.value.toUpperCase())} value={searchLicense} placeholder="License" /></th>
              <th><Form.Control onChange={(e) => setSearchEmail(e.target.value.toLowerCase())} value={searchEmail} placeholder="Email" /></th>
              <th><Form.Control type="number" onChange={(e) => setSearchActivations(e.target.value.toLowerCase())} value={searchActivations} placeholder="Activations" /></th>
              <th>
                <Form.Select onChange={(e) => setSearchStatus(e.target.value)} id="TableActivationDropdown">
                  <option value="">Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </th>
              <th><Button variant="secondary" className="p-1 text-white" onClick={() => ClearFilters()}>Clear Filters</Button></th>
            </tr>
            :
            <tr>
              <th>ID</th>
              <th>License</th>
              <th>Email</th>
              <th>Activations</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          }

        </thead>
        <tbody>
          {licenses && licenses.map(license => {
            if (searchString && license.fullDesc.search(searchString) == -1) return;
            return (
              <tr>
                <td className="align-middle" style={{ width: "80px" }}>{license.licenseId}</td>
                <td className="align-middle">
                  <div onClick={() => { setModalShow(true); setDetailedLicense(license) }} className="PointOnHover Link d-inline-block">
                    {license.licenseKey}
                  </div>
                  <CopyToClipboard text={license.licenseKey}
                    onCopy={() => setCopiedText(license.licenseKey)}>
                    {copiedText == license.licenseKey ?
                      <MdLibraryAddCheck style={{ color: "#4c4e50" }} className="ms-2 PointOnHover" />
                      :
                      <MdContentCopy style={{ color: "#7d93af" }} className="ms-2 PointOnHover" />
                    }
                  </CopyToClipboard>

                </td >
                <td className="align-middle">{license.email.toLowerCase()}</td>
                <td className="align-middle">
                  <span className="d-flex align-items-md-center justify-content-between">
                    {`${license.activations}/${license.maxUses}`}
                    {
                      license.activations > license.maxUses ? <MdOutlineError color="red" size="1.5em" /> : ""
                    }
                  </span>
                </td>
                <td className="align-middle">
                  {license.active ? (
                    <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="success">Active</Button>
                  ) : (
                    <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="danger">Inactive</Button>
                  )}
                </td>
                <td className="align-middle" style={{ width: "110px" }}>
                  <Button className="p-1" onClick={() => { setModalShow(true); setDetailedLicense(license) }}>Details</Button>
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
      {/* Pagination navigation */}
      <Row className="d-flex pe-4">
        <ul className="pagination justify-content-end">
          <li className="page-item PointOnHover">
            <a className="page-link" onClick={() => PreviousPage()}>Previous</a>
          </li>
          {(paginationPage < 3) ?
            <></>
            :
            <>
              <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(1)}>1</a></li>
            </>
          }
          {paginationPage == 1 ?
            <>
              <li className="page-item disabled"><a className="page-link">1</a></li>
              <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(2)}>2</a></li>
              <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(2)}>3</a></li>
            </>
            :
            <>
              {paginationPage == paginationPages ?
                <>
                  <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(paginationPage - 2)}>{paginationPage - 2}</a></li>
                  <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(paginationPage - 1)}>{paginationPage - 1}</a></li>
                  <li className="page-item disabled"><a className="page-link">{paginationPage}</a></li>
                </>
                :
                <>
                  <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(paginationPage - 1)}>{paginationPage - 1}</a></li>
                  <li className="page-item disabled"><a className="page-link">{paginationPage}</a></li>
                  <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(paginationPage + 1)}>{paginationPage + 1}</a></li>
                </>
              }
            </>
          }
          {(paginationPages < 4) || (paginationPage > paginationPages - 2) ?
            <></>
            :
            <>
              <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(paginationPages)}>{paginationPages}</a></li>
            </>
          }
          <li className="page-item PointOnHover">
            <a className="page-link PointOnHover" onClick={() => NextPage()}>Next</a>
          </li>
        </ul>
      </Row>
    </>
  )

  function ClearFilters() {
    setSearchId("");
    setSearchLicense("");
    setSearchEmail("");
    setSearchActivations("");
    setSearchStatus("");

    document.getElementById("TableActivationDropdown").value = "";
  }

  function NextPage() {
    if (paginationPage + 1 <= paginationPages) {
      setPaginationPage(paginationPage + 1);
    }
  }

  function PreviousPage() {
    if (paginationPage - 1 > 0) {
      setPaginationPage(paginationPage - 1);
    }
  }
}

export default LicenseTableComponent;