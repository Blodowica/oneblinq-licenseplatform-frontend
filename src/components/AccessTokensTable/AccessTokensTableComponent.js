import './AccessTokensTableComponent.css'
import { PaginationNavigationComponent, GlobalFilterComponent } from '../index'
import { Table, Button, Modal, Row, Col, Form, Alert } from 'react-bootstrap';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { forwardRef, useEffect, useState } from 'react';
import { useRequestWrapper } from '../../middleware';
import { MdOutlineManageSearch, MdContentCopy, MdLibraryAddCheck, MdOutlineError } from "react-icons/md";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function AccessTokensTableComponent() {
    //Recoil setup
    const paginationPageState = atom({ key: 'accessTokenPaginationPageState', default: 1, });
    const recordsCountState = atom({ key: 'accessTokenPaginationPageStateRecordsCountState', default: 10, });
    const filterSearchStringState = atom({ key: 'accessTokenPaginationPageStateFilterSearchStringState', default: "", });
    const filterDetailedSearchState = atom({ key: 'accessTokenPaginationPageStateFilterDetailedSearchState', default: false, });

    //general setup
    const [updateTable, setUpdateTable] = useState(false);
    const [showAlert, setShowAlert] = useRecoilState(atom({ key: 'accessTokenShowAlert', default: true, }));
    const [accessTokens, setAccessTokens] = useState("");
    const requestWrapper = useRequestWrapper()
    const [copiedText, setCopiedText] = useState("");
    const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/`;
    //datePicker Form
    // const DatePickerForm = <Form.Control placeholder="Created" />
    const DatePickerForm = forwardRef(({ value, onClick }, ref) => (
        <Form.Control value={value} onChange={() => { }} placeholder="Created" onClick={onClick} />
    ));
    //Filtering
    const detailedSearch = useRecoilValue(filterDetailedSearchState);
    const recordsCount = useRecoilValue(recordsCountState);
    const searchString = useRecoilValue(filterSearchStringState);

    const [searchId, setSearchId] = useRecoilState(atom({ key: 'accessTokenFilterId', default: "", }));
    const [searchAccesstoken, setSearchAccessToken] = useRecoilState(atom({ key: 'AccessTokenFilterAccessToken', default: "", }));
    const [searchEmail, setSearchEmail] = useRecoilState(atom({ key: 'AccessTokenFilterEmail', default: "", }));
    const [searchActive, setSearchStatus] = useRecoilState(atom({ key: 'AccessTokenFilterActive', default: "", }));
    const [searchCreatedAt, setSearchCreatedAt] = useRecoilState(atom({ key: 'AccesstokenFilterCreatedAt', default: null, }));

    //Pagination
    const [paginationPages, setPaginationPages] = useState(1);
    const [paginationPage, setPaginationPage] = useRecoilState(paginationPageState);

    useEffect(() => {
        var expiresAtDate = new Date(Date.parse(searchCreatedAt));
        requestWrapper.post(`${baseUrl}pagination/get-AccessTokens`,
            {
                globalFilter: searchString,
                filterId: searchId,
                filterAccesstoken: searchAccesstoken,
                filterEmail: searchEmail,
                FilterActive: searchActive,
                filterCreatedAt: expiresAtDate.toJSON(),
                pageNumber: paginationPage,
                pageSize: recordsCount,
            })
            .then(response => {
                setPaginationPages(response.maxPages);
                if (paginationPage > response.maxPages) {
                    setPaginationPage(1);
                }
                response.accessTokens.forEach(token => {
                    var displayDate = new Date(Date.parse(token.createdAt))
                    token.createdAt = `${displayDate.getDate()}-${displayDate.getMonth() + 1}-${displayDate.getFullYear()}`
                });
                setAccessTokens(response.accessTokens);
            }).catch((er) => {
                setAccessTokens(null)
                console.log(er)
            });
    }, [searchString, searchId, searchAccesstoken, searchEmail, searchActive, searchCreatedAt, recordsCount, paginationPage, updateTable])

    //table render
    return (
        <>
            {showAlert &&
                <Alert variant="warning" className="pt-2 pb-0" onClose={() => setShowAlert(false)} dismissible>
                    <p>
                        <b>Disabling an Access Token can cause problems to appear in different programs.</b><br />
                        Access Tokens are used by other programs to get access to this service.
                    </p>
                </Alert>
            }
            <Row className="d-flex">
                <Col xs lg="9">
                    <GlobalFilterComponent recordsCountState={recordsCountState} filterSearchStringState={filterSearchStringState} filterDetailedSearchState={filterDetailedSearchState} />
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
                        Create AccessToken
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover responsive>
                <thead>
                    {detailedSearch ?
                        <tr>
                            <th><Form.Control type="number" style={{ width: "80px" }} onChange={(e) => setSearchId(e.target.value)} value={searchId} placeholder="ID" /></th>
                            <th><Form.Control onChange={(e) => setSearchAccessToken(e.target.value)} value={searchAccesstoken} placeholder="Access Token" /></th>
                            <th><Form.Control onChange={(e) => setSearchEmail(e.target.value.toLowerCase())} value={searchEmail} placeholder="Creator" /></th>
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
                                <Form.Select onChange={(e) => setSearchStatus(e.target.value)} id="TableActivationDropdown">
                                    <option value="">Status</option>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </Form.Select>
                            </th>
                            <th><Button variant="secondary" className="p-1 text-white" onClick={() => ClearFilters()}>Clear Filters</Button></th>
                        </tr>
                        :
                        <tr>
                            <th>ID</th>
                            <th>Access Token</th>
                            <th>Creator</th>
                            <th>Created</th>
                            <th>Status</th>
                            <th>Actions</th>
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
                                            <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="success">Active</Button>
                                        ) : (
                                            <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="danger">Inactive</Button>
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
                                            {token.active ? <>Disable</> : <>Enable</>}
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                        : null
                    }
                </tbody>
            </Table>
            <PaginationNavigationComponent paginationPages={paginationPages} paginationPageState={paginationPageState} />
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