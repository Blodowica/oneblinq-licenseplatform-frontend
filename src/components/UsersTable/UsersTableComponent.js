import './UsersTableComponent.css'
import { PaginationNavigationComponent, GlobalFilterComponent } from '../index'
import { Table, Button, Modal, Row, Col, Form } from 'react-bootstrap';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useRequestWrapper } from '../../middleware';
import { MdOutlineManageSearch, MdContentCopy, MdLibraryAddCheck, MdOutlineError } from "react-icons/md";
import { CopyToClipboard } from 'react-copy-to-clipboard';

export function UsersTableComponent() {
    //Recoil setup
    const paginationPageState = atom({key: 'userPaginationPageState',default: 1,});
    const recordsCountState = atom({key: 'userRecordsCountState',default: 10,});
    const filterSearchStringState = atom({ key: 'userFilterSearchStringState', default: "", });
    const filterDetailedSearchState = atom({key: 'userFilterDetailedSearchState',default: false,});

    //general setup
    const [users, setUsers] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [detailedUser, setDetailedUser] = useState();
    const requestWrapper = useRequestWrapper()
    const [copiedText, setCopiedText] = useState("");
    const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/`;

    //Filtering
    const detailedSearch = useRecoilValue(filterDetailedSearchState);
    const recordsCount = useRecoilValue(recordsCountState);
    const searchString = useRecoilValue(filterSearchStringState);

    const [searchId, setSearchId] = useRecoilState(atom({key: 'userFilterId',default: "",}));
    const [searchFirstName, setSearchFirstName] = useRecoilState(atom({key: 'userFilterFirstName',default: "",}));
    const [searchLastName, setSearchLastName] = useRecoilState(atom({key: 'userFilterLastName',default: "",}));
    const [searchEmail, setSearchEmail] = useRecoilState(atom({key: 'userFilterEmail',default: "",}));
    const [searchLicenses, setSearchLicenses] = useRecoilState(atom({key: 'userFilterLicenses',default: "",}));

    //Pagination
    const [paginationPages, setPaginationPages] = useState(1);
    const [paginationPage, setPaginationPage] = useRecoilState(paginationPageState);

    //get all records and set a fullDesc value for searching
    //TODO: Remove the fullDesc logic, this will happen on server side in the future 
    useEffect(() => {
        requestWrapper.post(`${baseUrl}pagination/get-users`,
            {
                globalFilter: searchString,
                filterId: searchId,
                filterFirstName: searchFirstName,
                filterLastName: searchLastName,
                filterEmail: searchEmail,
                filterLicenseCount: searchLicenses,
                pageNumber: paginationPage,
                pageSize: recordsCount,
            })
            .then(response => {
                setPaginationPages(response.maxPages);
                if (paginationPage > response.maxPages) {
                    setPaginationPage(1);
                }
                setUsers(response.users);
            }).catch((er) => {
                setUsers(null)
                console.log(er)
            });
    }, [searchString, searchId, searchFirstName, searchLastName, searchEmail, searchLicenses, recordsCount, paginationPage])


    //detailed Users display
    function UserModal({ onHide, user, show }) {
        const [detailedData, setDetailedData] = useState();

        //get the needed data
        useEffect(() => {
            requestWrapper.get(`${baseUrl}User/${user.id}`)
                .then(response => {
                    console.log(response);
                    if (response.expiresAt) {
                        var displayDate = new Date(Date.parse(response.expiresAt))
                        response.expiresAt = `${displayDate.getDate() + 1}-${displayDate.getMonth() + 1}-${displayDate.getFullYear() + 1}`
                    }
                    setDetailedData(response);
                }).catch((er) => {
                    setUsers(null)
                    console.log(er)
                });
        }, [user])

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
                        User: <b>{(detailedData.firstName == null && detailedData.lastName == null) ? "No name found" : detailedData.firstName + " " + detailedData.lastName}</b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs lg="6">
                            <Form.Label>First name</Form.Label>
                            <Form.Control readOnly value={detailedData.firstName ? detailedData.firstName : "not found"} />
                        </Col>
                        <Col xs lg="6">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control readOnly value={detailedData.lastName ? detailedData.firstName : "not found"} />
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col xs lg="9">
                            <Form.Label>Email</Form.Label>
                            <Form.Control readOnly value={detailedData.email} />
                            <CopyToClipboard text={detailedData.email} className="DetailedUserEmailCopy d-flex ms-auto PointOnHover"
                                onCopy={() => setCopiedText(detailedData.email)}>
                                {copiedText == detailedData.email ?
                                    <MdLibraryAddCheck style={{ color: "#4c4e50" }} className="ms-2" />
                                    :
                                    <MdContentCopy style={{ color: "#7d93af" }} className="ms-2" />
                                }
                            </CopyToClipboard>
                        </Col>
                        <Col xs lg="3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control readOnly value={detailedData.role} />
                        </Col>
                    </Row>
                    {detailedData.licenses.length > 0 &&
                        <hr />
                    }
                    <Row className="mt-2 DetailedUserLicensesContainer overflow-auto">
                        {detailedData.licenses.map((license, i) => {
                            return (
                                <Row key={i} className="mb-2">
                                    <Col xs lg="7">
                                        <Form.Label className="mb-0">License Key</Form.Label>
                                        <Form.Control readOnly value={license.licenseKey} />
                                        <CopyToClipboard text={license.licenseKey} className="DetailedUserEmailCopy d-flex ms-auto PointOnHover"
                                            onCopy={() => setCopiedText(license.licenseKey)}>
                                            {copiedText == license.licenseKey ?
                                                <MdLibraryAddCheck style={{ color: "#4c4e50" }} className="ms-2" />
                                                :
                                                <MdContentCopy style={{ color: "#7d93af" }} className="ms-2" />
                                            }
                                        </CopyToClipboard>
                                    </Col>
                                    <Col xs lg="3">
                                        <Form.Label className="mb-0">Product</Form.Label>
                                        <Form.Control readOnly value={license.productName} />
                                    </Col>
                                    <Col xs lg="2">
                                        <Form.Label className="mb-0">Activations</Form.Label>
                                        <Form.Control readOnly value={`${license.activations}/${license.maxActivations}`} />
                                        {license.activations > license.maxActivations &&
                                            <MdOutlineError color="red" size="1.5em" className="d-flex ms-auto DetailedUserDanger" />
                                        }
                                    </Col>
                                </Row>
                            )
                        })}
                    </Row>
                </Modal.Body>
                <Modal.Footer className="pb-1 pt-1">
                    <Button variant="secondary" onClick={() => onHide()}>Edit</Button>
                </Modal.Footer>
            </Modal >
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
                            <th><Form.Control onChange={(e) => setSearchFirstName(e.target.value)} value={searchFirstName} placeholder="First name" /></th>
                            <th><Form.Control onChange={(e) => setSearchLastName(e.target.value)} value={searchLastName} placeholder="Last name" /></th>
                            <th><Form.Control onChange={(e) => setSearchEmail(e.target.value.toLowerCase())} value={searchEmail} placeholder="Email" /></th>
                            <th><Form.Control type="number" onChange={(e) => setSearchLicenses(e.target.value)} value={searchLicenses} placeholder="Licenses" /></th>
                            <th><Button variant="secondary" className="p-1 text-white" onClick={() => ClearFilters()}>Clear Filters</Button></th>
                        </tr>
                        :
                        <tr>
                            <th>ID</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Licenses</th>
                            <th>Actions</th>
                        </tr>
                    }

                </thead>
                <tbody>
                    {users ? users.map(user => {
                        return (
                            <tr key={user.id}>
                                <td className="align-middle" style={{ width: "80px" }}>{user.id}</td>
                                <td className="align-middle">{user.firstName}</td>
                                <td className="align-middle">{user.lastName}</td>
                                <td className="align-middle">{user.email.toLowerCase()}</td>
                                <td className="align-middle">{user.licenseCount}</td>
                                <td className="align-middle" style={{ width: "110px" }}>
                                    <Button className="p-1" onClick={() => { setModalShow(true); setDetailedUser(user) }}>Details</Button>
                                </td>
                            </tr>
                        )
                    }

                    ) : null}
                    {(detailedUser && modalShow) && <UserModal
                        onHide={() => setModalShow(false)}
                        user={detailedUser}
                        show={modalShow}
                    />}

                </tbody>
            </Table>
            <PaginationNavigationComponent paginationPages={paginationPages} paginationPageState={paginationPageState} />
        </>
    )

    function ClearFilters() {
        setSearchId("");
        setSearchFirstName("");
        setSearchLastName("");
        setSearchEmail("");
        setSearchLicenses("");
    }
}

export default UsersTableComponent;