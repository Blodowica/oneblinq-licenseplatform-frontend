import './AccessTokensTableComponent.css'
import { PaginationNavigationComponent, GlobalFilterComponent } from '../index'
import { Table, Button, Modal, Row, Col, Form, Alert } from 'react-bootstrap';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { useRequestWrapper } from '../../middleware';
import { MdOutlineManageSearch, MdContentCopy, MdLibraryAddCheck, MdOutlineError } from "react-icons/md";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation, initReactI18next } from "react-i18next";
import { AccessTokenWarningAtom, TableAmountAtom, TableFiltersAtom, TablePageAtom, TableSearchToggleAtom } from '../../state';

export function AccessTokensTableComponent() {
    //setup i18next
    const { t } = useTranslation();

    //general setup
    const requestWrapper = useRequestWrapper();
    const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/`;

    const [updateTable, setUpdateTable] = useState(false);
    const [showAlert, setShowAlert] = useRecoilState(AccessTokenWarningAtom);
    const [accessTokens, setAccessTokens] = useState("");
    const [copiedText, setCopiedText] = useState("");

    //filtering delay
    const [timer, setTimer] = useState(null);
    const isMounted = useRef(false);

    //datePicker Form
    const DatePickerForm = forwardRef(({ value, onClick }, ref) => (
        <Form.Control value={value} onChange={() => { }} placeholder={t('dashboard_created')} onClick={onClick} />
    ));
    //Filtering
    const detailedSearch = useRecoilValue(TableSearchToggleAtom("AccessToken"));
    const recordsCount = useRecoilValue(TableAmountAtom("AccessToken"));
    const searchString = useRecoilValue(TableFiltersAtom("AccessToken"));

    const [searchId, setSearchId] = useRecoilState(TableFiltersAtom("AccessTokenId"));
    const [searchAccesstoken, setSearchAccessToken] = useRecoilState(TableFiltersAtom("AccessTokenToken"));
    const [searchEmail, setSearchEmail] = useRecoilState(TableFiltersAtom("AccessTokenEmail"));
    const [searchStatus, setSearchStatus] = useRecoilState(TableFiltersAtom("AccessTokenStatus"));
    const [searchCreatedAt, setSearchCreatedAt] = useRecoilState(TableFiltersAtom("AccessTokenCreatedAt"));

    //Pagination
    const [paginationPages, setPaginationPages] = useState(1);
    const [paginationPage, setPaginationPage] = useRecoilState(TablePageAtom("AccessToken"));

    function fetchAccessTokens() {
        var expiresAtDate = new Date(Date.parse(searchCreatedAt));
        requestWrapper.post(`${baseUrl}pagination/get-AccessTokens`,
            {
                globalFilter: searchString,
                filterId: searchId,
                filterAccesstoken: searchAccesstoken,
                filterEmail: searchEmail,
                FilterActive: searchStatus,
                filterCreatedAt: expiresAtDate.toJSON(),
                pageNumber: paginationPage,
                pageSize: recordsCount,
            })
            .then(response => {
                setPaginationPages(response.maxPages);
                if (paginationPage > response.maxPages) {
                    setPaginationPage(1);
                }
                response.records.forEach(token => {
                    var displayDate = new Date(Date.parse(token.createdAt))
                    token.createdAt = `${displayDate.getDate()}-${displayDate.getMonth() + 1}-${displayDate.getFullYear()}`
                });
                setAccessTokens(response.records);
            }).catch((er) => {
                setAccessTokens(null)
                console.log(er)
            });
    }

    useEffect(() => {
        fetchAccessTokens();
    }, [recordsCount, paginationPage, updateTable, searchStatus, searchCreatedAt])

    useEffect(() => {
        clearTimeout(timer);
        isMounted.current ? setTimer(setTimeout(() => { fetchAccessTokens() }, 300)) : isMounted.current = true;
    }, [searchString, searchId, searchAccesstoken, searchEmail])

    //table render
    return (
        <>
            {showAlert &&
                <Alert variant="warning" className="pt-2 pb-0" onClose={() => setShowAlert(false)} dismissible>
                    <p>
                        <b>{t('dashboard_accesstoken_warning_bold')}</b><br />
                        {t('dashboard_accesstoken_warning')}
                    </p>
                </Alert>
            }
            <Row className="d-flex">
                <Col xs lg="9">
                    <GlobalFilterComponent table="AccessToken" />
                </Col>
                <Col xs lg="3">
                    <Button variant="primary" className="p-1 d-flex ms-auto me-3" onClick={() => {
                        requestWrapper.post(`${baseUrl}AccessToken/create-access-token`)
                            .then(() => {
                                setUpdateTable(!updateTable);
                            }).catch((er) => {
                                console.log(er)
                            });
                    }}>
                        {t('dashboard_create_accesstoken')}
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover responsive>
                <thead>
                    {detailedSearch ?
                        <tr>
                            <th><Form.Control type="number" style={{ width: "80px" }} onChange={(e) => setSearchId(e.target.value)} value={searchId} placeholder="ID" /></th>
                            <th><Form.Control onChange={(e) => setSearchAccessToken(e.target.value)} value={searchAccesstoken} placeholder={t('dashboard_accesstoken')} /></th>
                            <th><Form.Control onChange={(e) => setSearchEmail(e.target.value.toLowerCase())} value={searchEmail} placeholder={t('dashboard_accesstoken_creator')} /></th>
                            <th className="AccessTokenDatePickerTH">
                                <DatePicker
                                    selected={searchCreatedAt}
                                    onChange={(date) => {
                                        setSearchCreatedAt(date);
                                    }}
                                    customInput={<DatePickerForm />}
                                    dateFormat="dd-MM-yyyy"
                                    maxDate={new Date()}
                                    showPopperArrow={false}
                                    isClearable={true}
                                    clearIcon={null}
                                />
                            </th>
                            <th>
                                <Form.Select onChange={(e) => setSearchStatus(e.target.value)} id="TableActivationDropdown" value={searchStatus}>
                                    <option value="">{t('dashboard_status')}</option>
                                    <option value="true">{t('dashboard_active')}</option>
                                    <option value="true">{t('dashboard_inactive')}</option>
                                    <option value="false"></option>
                                </Form.Select>
                            </th>
                            <th><Button variant="secondary" className="p-1 text-white" onClick={() => ClearFilters()}>{t('dashboard_clear_filters')}</Button></th>
                        </tr>
                        :
                        <tr>
                            <th>ID</th>
                            <th>{t('dashboard_accesstoken')}</th>
                            <th>{t('dashboard_accesstoken_creator')}</th>
                            <th>{t('dashboard_accesstoken_created')}</th>
                            <th>{t('dashboard_status')}</th>
                            <th>{t('dashboard_actions')}</th>
                        </tr>
                    }

                </thead>
                <tbody>
                    {accessTokens ?
                        accessTokens.map(token => {
                            return (
                                <tr key={token.id}>
                                    <td className="align-middle" style={{ width: "80px" }}>{token.id}</td>
                                    <td className="align-middle">
                                        {token.accessToken}
                                        <CopyToClipboard text={token.accessToken}
                                            onCopy={() => setCopiedText(token.accessToken)}>
                                            {copiedText == token.accessToken ?
                                                <MdLibraryAddCheck style={{ color: "#4c4e50" }} className="ms-2 PointOnHover" />
                                                :
                                                <MdContentCopy style={{ color: "#7d93af" }} className="ms-2 PointOnHover" />
                                            }
                                        </CopyToClipboard>
                                    </td>
                                    <td className="align-middle">{token.email.toLowerCase()}</td>
                                    <td className="align-middle">{token.createdAt}</td>
                                    <td className="align-middle">
                                        {token.active ? (
                                            <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="success">{t('dashboard_active')}</Button>
                                        ) : (
                                            <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="danger">{t('dashboard_inactive')}</Button>
                                        )}
                                    </td>
                                    <td className="align-middle" style={{ width: "110px" }}>
                                        <Button className={"p-1 btn-" + (token.active ? 'danger' : 'primary')} onClick={() => {
                                            requestWrapper.post(`${baseUrl}AccessToken/toggle-access-token/${token.id}`)
                                                .then(() => {
                                                    setUpdateTable(!updateTable);
                                                }).catch((er) => {
                                                    console.log(er)
                                                });
                                        }}>
                                            {token.active ? <>{t('dashboard_disable')}</> : <>{t('dashboard_enable')}</>}
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                        : null
                    }
                </tbody>
            </Table>
            <PaginationNavigationComponent table="AccessToken" pages={paginationPages} />
        </>
    )

    function ClearFilters() {
        setSearchId("");
        setSearchAccessToken("");
        setSearchEmail("");
        setSearchCreatedAt(null);
        setSearchStatus("");

        document.getElementById("TableActivationDropdown").value = "";
    }
}

export default AccessTokensTableComponent;