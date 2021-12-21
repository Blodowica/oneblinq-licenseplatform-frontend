import { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from "react-i18next";
import { MdContentCopy, MdLibraryAddCheck, MdOutlineError } from "react-icons/md";
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRequestWrapper } from '../../middleware';
import { TableAmountAtom, TableFiltersAtom, TablePageAtom, TableSearchToggleAtom } from '../../state';
import { GlobalFilterComponent, PaginationNavigationComponent } from '../index';
import './LicenseTableComponent.css';

export function LicenseTableComponent() {
  // setup i18next
  const { t } = useTranslation();

  //general setup
  const requestWrapper = useRequestWrapper()
  const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/`;
  const [isLoadingToggle, setIsLoadingToggle] = useState(false);

  const [licenses, setLicenses] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [detailedLicense, setDetailedLicense] = useState();
  const [copiedText, setCopiedText] = useState("");
  const [updateModal, setUpdateModal] = useState(false);

  //filtering delay
  const [timer, setTimer] = useState(null);
  const isMounted = useRef(false);

  //Filtering
  const detailedSearch = useRecoilValue(TableSearchToggleAtom("License"));
  const recordsCount = useRecoilValue(TableAmountAtom("License"));
  const searchString = useRecoilValue(TableFiltersAtom("License"));

  const [searchId, setSearchId] = useRecoilState(TableFiltersAtom("LicenseId"));
  const [searchLicense, setSearchLicense] = useRecoilState(TableFiltersAtom("LicenseKey"));
  const [searchEmail, setSearchEmail] = useRecoilState(TableFiltersAtom("LicenseEmail"));
  const [searchActivations, setSearchActivations] = useRecoilState(TableFiltersAtom("LicenseActivations"));
  const [searchStatus, setSearchStatus] = useRecoilState(TableFiltersAtom("LicenseStatus"));
  const [searchProduct, setSearchProduct] = useRecoilState(TableFiltersAtom("LicenseProduct"));

  //pagination
  const [paginationPages, setPaginationPages] = useState(1);
  const [paginationPage, setPaginationPage] = useRecoilState(TablePageAtom("License"));

  function FetchLicenses() {
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
        setLicenses(response.records);
      }).catch((er) => {
        setLicenses(null)
        console.log(er)
      });
  }

  useEffect(() => {
    FetchLicenses();
  }, [recordsCount, paginationPage, searchStatus, updateModal])

  useEffect(() => {
    clearTimeout(timer);
    isMounted.current ? setTimer(setTimeout(() => { FetchLicenses() }, 300)) : isMounted.current = true;
  }, [searchString, searchId, searchLicense, searchEmail, searchActivations, searchProduct])

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
              <Form.Label>{t('dashboard_email')}</Form.Label>
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

          <Row>
            <Col xs lg="12">
              <Form.Label>{t('dashboard_activation_log')}</Form.Label>
              <Form.Control as="textarea" value={detailedData.activationLogs && detailedData.activationLogs.map(x => x.message).join('\n\n')} readOnly rows={5} />
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button className={"btn-" + (detailedData.active ? 'danger ' : 'primary ') + (isLoadingToggle ? 'disabled' : '')} onClick={async () => {
            setIsLoadingToggle(true);
            await requestWrapper.post(`${baseUrl}license/toggle-license/${license.id}`)
              .then(() => {
                setUpdateModal(!updateModal);
              }
              ).catch((er) => {
                console.log(er)
              });
            setIsLoadingToggle(false);
          }}>
            {isLoadingToggle &&
              <span className="spinner-border spinner-border-sm me-2"></span>
            }
            {detailedData.active ? <>{t('dashboard_disable')}</> : <>{t('dashboard_enable')}</>}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  //table render
  return (
    <>
      <GlobalFilterComponent table="License" />
      <Table striped bordered hover responsive>
        <thead>
          {detailedSearch ?
            <tr>
              <th><Form.Control type="number" style={{ width: "80px" }} onChange={(e) => setSearchId(e.target.value)} value={searchId} placeholder="ID" /></th>
              <th><Form.Control onChange={(e) => setSearchLicense(e.target.value.toUpperCase())} value={searchLicense} placeholder={t('dashboard_licenses')} /></th>
              <th><Form.Control onChange={(e) => setSearchProduct(e.target.value)} value={searchProduct} placeholder={t('dashboard_product')} /></th>
              <th><Form.Control onChange={(e) => setSearchEmail(e.target.value.toLowerCase())} value={searchEmail} placeholder="Email" /></th>
              <th><Form.Control type="number" onChange={(e) => setSearchActivations(e.target.value)} value={searchActivations} placeholder={t('dashboard_activations')} /></th>
              <th>
                <Form.Select onChange={(e) => setSearchStatus(e.target.value)} id="TableActivationDropdown" value={searchStatus}>
                  <option value="">{t('dashboard_status')}</option>
                  <option value="active">{t('dashboard_active')}</option>
                  <option value="inactive">{t('dashboard_inactive')}</option>
                </Form.Select>
              </th>
              <th><Button variant="secondary" className="p-1 text-white" onClick={() => ClearFilters()}>{t('dashboard_clear_filters')}</Button></th>
            </tr>
            :
            <tr>
              <th>ID</th>
              <th>{t('dashboard_licenses')}</th>
              <th>{t('dashboard_products')}</th>
              <th>{t('dashboard_email')}</th>
              <th>{t('dashboard_activations')}</th>
              <th>{t('dashboard_status')}</th>
              <th>{t('dashboard_actions')}</th>
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
                    <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="success">{t('dashboard_active')}</Button>
                  ) : (
                    <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="danger">{t('dashboard_inactive')}</Button>
                  )}
                </td>
                <td className="align-middle" style={{ width: "110px" }}>
                  <Button className="p-1" onClick={() => { setModalShow(true); setDetailedLicense(license) }}>{t('dashboard_details')}</Button>
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
      <PaginationNavigationComponent table="License" pages={paginationPages} />
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