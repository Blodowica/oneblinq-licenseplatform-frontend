import './LicenseTableComponent.css'
import { PaginationNavigationComponent, GlobalFilterComponent } from '../index'
import { Table, Button, Badge, Modal, Row, Col, Card, Form, Container } from 'react-bootstrap';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useRequestWrapper } from '../../middleware';
import { MdOutlineError, MdOutlineManageSearch, MdContentCopy, MdLibraryAddCheck } from "react-icons/md";
import { CopyToClipboard } from 'react-copy-to-clipboard';

export function LicenseTableComponent() {
  //Recoil setup
  const paginationPageState = atom({ key: 'licensePaginationPageState', default: 1, });
  const recordsCountState = atom({ key: 'licenseRecordsCountState', default: 10, });
  const filterSearchStringState = atom({ key: 'licenseFilterSearchStringState', default: "", });
  const filterDetailedSearchState = atom({ key: 'licenseFilterDetailedSearchState', default: false, });

  //general setup
  const [licenses, setLicenses] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [detailedLicense, setDetailedLicense] = useState();
  const requestWrapper = useRequestWrapper()
  const [copiedText, setCopiedText] = useState("");
  const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/`;
  const [updateModal, setUpdateModal] = useState(false);

  //Filtering
  const detailedSearch = useRecoilValue(filterDetailedSearchState);
  const recordsCount = useRecoilValue(recordsCountState);
  const searchString = useRecoilValue(filterSearchStringState);

  const [searchId, setSearchId] = useRecoilState(atom({ key: 'licenseFilterId', default: "", }));
  const [searchLicense, setSearchLicense] = useRecoilState(atom({ key: 'licenseFilterLicensekey', default: "", }));
  const [searchEmail, setSearchEmail] = useRecoilState(atom({ key: 'licenseFilterEmail', default: "", }));
  const [searchActivations, setSearchActivations] = useRecoilState(atom({ key: 'licenseFilterActivations', default: "", }));
  const [searchStatus, setSearchStatus] = useRecoilState(atom({ key: 'licenseFilterStatus', default: "", }));
  const [searchProduct, setSearchProduct] = useRecoilState(atom({ key: 'licenseFilterProduct', default: "", }));

  //pagination
  const [paginationPages, setPaginationPages] = useState(1);
  const [paginationPage, setPaginationPage] = useRecoilState(paginationPageState);

  useEffect(() => {
    requestWrapper.post(`${baseUrl}pagination/get-licenses`,
      {
        globalFilter: searchString,
        filterId: searchId,
        filterLicenseKey: searchLicense,
        filterEmail: searchEmail,
        filterActivation: searchActivations,
        filterActive: searchStatus,
        filterProductName: searchProduct,
        pageNumber: paginationPage,
        pageSize: recordsCount,
      })
      .then(response => {
        setPaginationPages(response.maxPages);
        if (paginationPage > response.maxPages) {
          setPaginationPage(1);
        }
        setLicenses(response.licenses);
      }).catch((er) => {
        setLicenses(null)
        console.log(er)
      });
  }, [searchString, searchId, searchLicense, searchEmail, searchActivations, searchStatus, searchProduct, recordsCount, paginationPage, recordsCount, updateModal])

  //detailed license display
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
              {detailedData.activations > detailedData.maxUses &&
                <MdOutlineError color="red" size="1.5em" className="d-flex ms-auto DetailedUserDanger" />
              }
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
          <Button className={"btn-" + (detailedData.active ? 'danger' : 'primary')} onClick={() => {
            requestWrapper.post(`${baseUrl}license/toggle-license/${license.id}`)
              .then(() => {
                setUpdateModal(!updateModal);
              }
              ).catch((er) => {
                console.log(er)
              });
          }}>
            {detailedData.active ? <>Disable</> : <>Enable</>}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  //table render
  return (
    <>
      <GlobalFilterComponent recordsCountState={recordsCountState} filterSearchStringState={filterSearchStringState} filterDetailedSearchState={filterDetailedSearchState} />
      <Table striped bordered hover responsive>
        <thead>
          {detailedSearch ?
            <tr>
              <th><Form.Control type="number" style={{ width: "80px" }} onChange={(e) => setSearchId(e.target.value)} value={searchId} placeholder="ID" /></th>
              <th><Form.Control onChange={(e) => setSearchLicense(e.target.value.toUpperCase())} value={searchLicense} placeholder="License" /></th>
              <th><Form.Control onChange={(e) => setSearchProduct(e.target.value)} value={searchProduct} placeholder="Product" /></th>
              <th><Form.Control onChange={(e) => setSearchEmail(e.target.value.toLowerCase())} value={searchEmail} placeholder="Email" /></th>
              <th><Form.Control type="number" onChange={(e) => setSearchActivations(e.target.value)} value={searchActivations} placeholder="Activations" /></th>
              <th>
                <Form.Select onChange={(e) => setSearchStatus(e.target.value)} id="TableActivationDropdown">
                  <option value="">Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </th>
              <th><Button variant="secondary" className="p-1 text-white" onClick={() => ClearFilters()}>Clear Filters</Button></th>
            </tr>
            :
            <tr>
              <th>ID</th>
              <th>License</th>
              <th>Product</th>
              <th>Email</th>
              <th>Activations</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          }

        </thead>
        <tbody>
          {licenses ? licenses.map(license => {
            return (
              <tr key={license.id}>
                <td className="align-middle" style={{ width: "80px" }}>{license.id}</td>
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
                <td className="align-middle">{license.productName}</td>
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
          ) : null}
          {(detailedLicense && modalShow) && <LicenseModal
            onHide={() => setModalShow(false)}
            license={detailedLicense}
            show={modalShow}
          />}
        </tbody>
      </Table>
      <PaginationNavigationComponent paginationPages={paginationPages} paginationPageState={paginationPageState} />
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
}

export default LicenseTableComponent;