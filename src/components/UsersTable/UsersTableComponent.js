import i18n from "i18next";
import languageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { initReactI18next, useTranslation } from "react-i18next";
import { MdContentCopy, MdLibraryAddCheck, MdOutlineError } from "react-icons/md";
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRequestWrapper } from '../../middleware';
import { TableAmountAtom, TableFiltersAtom, TablePageAtom, TableSearchToggleAtom } from '../../state';
import { GlobalFilterComponent, PaginationNavigationComponent } from '../index';
import { Localization } from '../Localization/LocalizationComponent';
import './UsersTableComponent.css';

<Localization />
i18n
    .use(initReactI18next)
    .use(languageDetector)
    .use(HttpApi)

    .init({
        //if you're using a language detector don't define the lng option
        fallbackLng: "en",

        //language detection
        detection: {
            order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
            caches: ['cookie'],
        },

        //i18next http backend
        backend: {
            loadPath: '../../assets/locales/{{lng}}/translation.json'

        },

        react: { useSuspense: false }
    })



export function UsersTableComponent() {
    //setup i18next
    const { t } = useTranslation();
    
    //general setup
    const requestWrapper = useRequestWrapper()
    const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/`;

    const [users, setUsers] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [detailedUser, setDetailedUser] = useState();
    const [copiedText, setCopiedText] = useState("");
    const [showCreateAdmin, setShowCreateAdmin] = useState(false);
    const [updateTable, setUpdateTable] = useState(false);
    const [editUser, setEditUser] = useState(false);

    //filtering delay
    const [timer, setTimer] = useState(null);
    const isMounted = useRef(false);

    //Filtering
    const detailedSearch = useRecoilValue(TableSearchToggleAtom("User"));
    const recordsCount = useRecoilValue(TableAmountAtom("User"));
    const searchString = useRecoilValue(TableFiltersAtom("User"));

    const [searchId, setSearchId] = useRecoilState(TableFiltersAtom("UserId"));
    const [searchFirstName, setSearchFirstName] = useRecoilState(TableFiltersAtom("UserFirstName"));
    const [searchLastName, setSearchLastName] = useRecoilState(TableFiltersAtom("UserLastName"));
    const [searchEmail, setSearchEmail] = useRecoilState(TableFiltersAtom("UserEmail"));
    const [searchLicenses, setSearchLicenses] = useRecoilState(TableFiltersAtom("UserLicenses"));
    const [searchRole, setSearchRole] = useRecoilState(TableFiltersAtom("UserRole"));

    //Pagination
    const [paginationPages, setPaginationPages] = useState(1);
    const [paginationPage, setPaginationPage] = useRecoilState(TablePageAtom("User"));

    function FetchUsers() {
        requestWrapper.post(`${baseUrl}pagination/get-users`,
        {
            globalFilter: searchString,
            filterId: searchId,
            filterFirstName: searchFirstName,
            filterLastName: searchLastName,
            filterEmail: searchEmail,
            filterLicenseCount: searchLicenses,
            filterRole: searchRole,
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
    }

    useEffect(() => {
        FetchUsers();
    }, [recordsCount, paginationPage, updateTable, searchRole])

    useEffect(() => {
        clearTimeout(timer);
        isMounted.current ? setTimer(setTimeout(() => { FetchUsers() }, 300)) : isMounted.current = true;
    }, [searchString, searchId, searchFirstName, searchLastName, searchEmail, searchLicenses])

    //detailed Users display
    function UserModal({ onHide, user, show }) {
        const [detailedData, setDetailedData] = useState();
        //user edit date
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [email, setEmail] = useState("");
        const [role, setRole] = useState("");

        //get the needed data
        useEffect(() => {
            requestWrapper.get(`${baseUrl}User/${user.id}`)
                .then(response => {
                    if (response.expiresAt) {
                        var displayDate = new Date(Date.parse(response.expiresAt))
                        response.expiresAt = `${displayDate.getDate() + 1}-${displayDate.getMonth() + 1}-${displayDate.getFullYear() + 1}`
                    }
                    setDetailedData(response);
                    (response.firstName == null) ? setFirstName("") : setFirstName(response.firstName);
                    (response.lastName == null) ? setLastName("") : setLastName(response.lastName);
                    setEmail(response.email);
                    setRole(response.role);
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
                        User: <b>{(firstName == "" && lastName == "") ? "No name found" : firstName + " " + lastName}</b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs lg="6">
                            <Form.Label>{t('dashboard_firstname')}</Form.Label>
                            {editUser ?
                                <Form.Control onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                                :
                                <Form.Control readOnly value={detailedData.firstName ? detailedData.firstName : "not found"} />
                            }
                        </Col>
                        <Col xs lg="6">
                            <Form.Label>{t('dashboard_lastname')}</Form.Label>
                            {editUser ?
                                <Form.Control onChange={(e) => setLastName(e.target.value)} value={lastName} />
                                :
                                <Form.Control readOnly value={detailedData.lastName ? detailedData.firstName : "not found"} />
                            }
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col xs lg="9">
                            <Form.Label>Email</Form.Label>
                            {editUser ?
                                <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} />
                                :
                                <>
                                    <Form.Control readOnly value={detailedData.email} />
                                    <CopyToClipboard text={detailedData.email} className="DetailedUserEmailCopy d-flex ms-auto PointOnHover"
                                        onCopy={() => setCopiedText(detailedData.email)}>
                                        {copiedText == detailedData.email ?
                                            <MdLibraryAddCheck style={{ color: "#4c4e50" }} className="ms-2" />
                                            :
                                            <MdContentCopy style={{ color: "#7d93af" }} className="ms-2" />
                                        }
                                    </CopyToClipboard>
                                </>
                            }
                        </Col>
                        <Col xs lg="3">
                            <Form.Label>{t('dashboard_role')}</Form.Label>
                            {editUser ?
                                <Form.Select onChange={(e) => setRole(e.target.value)} value={role}>
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </Form.Select>
                                :
                                <Form.Control readOnly value={detailedData.role} />
                            }
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
                                        <Form.Label className="mb-0">{t('dashboard_licensekey')}</Form.Label>
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
                                        <Form.Label className="mb-0">{t('dashboard_products')}</Form.Label>
                                        <Form.Control readOnly value={license.productName} />
                                    </Col>
                                    <Col xs lg="2">
                                        <Form.Label className="mb-0">{t('dashboard_activations')}</Form.Label>
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
                {editUser ?
                    <Modal.Footer className="pb-1 pt-1 d-flex">
                        <Button variant="secondary" onClick={() => setEditUser(false)}>{t('dashboard_cancel')}</Button>
                        <Button variant="success" onClick={() => {

                            console.log(detailedData);
                            requestWrapper.post(`${baseUrl}user/edit-user/${detailedData.id}`,
                                {
                                    firstName: firstName,
                                    lastName: lastName,
                                    email: email,
                                    role: role,
                                })
                                .then(() => {
                                    setEditUser(false);
                                    setUpdateTable(!updateTable);
                                }).catch((er) => {
                                    setEditUser(false);
                                    console.log(er)
                                    return alert(er);
                                })
                        }}>{t('dashboard_save')}</Button>
                    </Modal.Footer>
                    :
                    <Modal.Footer className="pb-1 pt-1">
                        <Button variant="secondary" onClick={() => setEditUser(true)}>{t('dashboard_edit')}</Button>
                    </Modal.Footer>
                }
            </Modal >
        );
    }

    //Create admin modal
    function CreateAdminModal({ onHide, show }) {
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [repeatPassword, setRepeatPassword] = useState("");

        function CreateAdmin() {
            //validation check
            function validateEmail() {
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            }
            function arePasswordsSame() {
                if (password && repeatPassword && password == repeatPassword) {
                    return true
                }
                return false
            }
            if (firstName.length < 1) return alert("Enter a valid first name");
            if (lastName.length < 1) return alert("Enter a valid last name");
            if (!validateEmail()) return alert("Wrong email format");
            if (!password || password.length < 5) return alert("Password needs to be 5+ characters long");
            if (!arePasswordsSame()) return alert("Passwords aren't same");

            requestWrapper.post(`${baseUrl}account/create-admin`,
                {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                })
                .then(() => {
                    setShowCreateAdmin(false);
                    setUpdateTable(!updateTable);
                }).catch((er) => {
                    console.log(er)
                    return alert(er);
                });
        }

        return (
            <Modal
                show={show}
                onHide={onHide}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="DetailedRecordModalHeader">
                    <Modal.Title id="contained-modal-title-vcenter">
                        {t('dashboard_create_admin')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs lg="6">
                            <Form.Label>{t('dashboard_firstname')}*</Form.Label>
                            <Form.Control value={firstName} placeholder="John" onChange={(e) => setFirstName(e.target.value)} />
                        </Col>
                        <Col xs lg="6">
                            <Form.Label>{t('dashboard_lastname')}*</Form.Label>
                            <Form.Control value={lastName} placeholder="Doe" onChange={(e) => setLastName(e.target.value)} />
                        </Col>
                    </Row>

                    <Row className="mt-2">
                        <Col xs>
                            <Form.Label>Email*</Form.Label>
                            <Form.Control value={email} placeholder="email@mail.com" onChange={(e) => setEmail(e.target.value)} />
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs lg="6">
                            <Form.Label>{t('dashboard_password')}*</Form.Label>
                            <Form.Control type="password" value={password} placeholder="******" onChange={(e) => setPassword(e.target.value)} />
                        </Col>
                        <Col xs lg="6">
                            <Form.Label>{t('dashboard_repeat_password')}*</Form.Label>
                            <Form.Control type="password" value={repeatPassword} placeholder="******" onChange={(e) => setRepeatPassword(e.target.value)} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="pb-1 pt-1">
                    <Button variant="secondary" onClick={() => CreateAdmin()}>{t('dashboard_create')}</Button>
                </Modal.Footer>
            </Modal >
        );
    }

    //table render
    return (
        <>
            <Row className="d-flex">
                <Col xs lg="9">
                    <GlobalFilterComponent table="User"/>
                </Col>
                <Col xs lg="3">
                    <Button variant="primary" className="p-1 d-flex ms-auto me-3" onClick={() => {
                        setShowCreateAdmin(true);
                    }}>
                        {t('dashboard_create_admin')}
                    </Button>
                </Col>
            </Row>
            {showCreateAdmin && <CreateAdminModal
                onHide={() => setShowCreateAdmin(false)}
                show={showCreateAdmin}
            />}
            <Table striped bordered hover responsive>
                <thead>
                    {detailedSearch ?
                        <tr>
                            <th><Form.Control type="number" style={{ width: "80px" }} onChange={(e) => setSearchId(e.target.value)} value={searchId} placeholder="ID" /></th>
                            <th><Form.Control onChange={(e) => setSearchFirstName(e.target.value)} value={searchFirstName} placeholder={t('dashboard_firstname')} /></th>
                            <th><Form.Control onChange={(e) => setSearchLastName(e.target.value)} value={searchLastName} placeholder={t('dashboard_lastname')} /></th>
                            <th><Form.Control onChange={(e) => setSearchEmail(e.target.value.toLowerCase())} value={searchEmail} placeholder="Email" /></th>
                            <th><Form.Control type="number" onChange={(e) => setSearchLicenses(e.target.value)} value={searchLicenses} placeholder={t('dashboard_licenses')} /></th>
                            <th>
                                <Form.Select id="TableRoleDropdown" onChange={(e) => setSearchRole(e.target.value)} value={searchRole}>
                                    <option value="">Role</option>
                                    <option value="User">User</option>
                                    <option value="Admin">Admin</option>
                                </Form.Select>
                            </th>
                            <th><Button variant="secondary" className="p-1 text-white" onClick={() => ClearFilters()}>{t('dashboard_clear_filters')}</Button></th>
                        </tr>
                        :
                        <tr>
                            <th>ID</th>
                            <th>{t('dashboard_firstname')}</th>
                            <th>{t('dashboard_lastname')}</th>
                            <th>Email</th>
                            <th>{t('dashboard_licenses')}</th>
                            <th>{t('dashboard_role')}</th>
                            <th>{t('dashboard_actions')}</th>
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
                                <td className="align-middle">{user.role}</td>
                                <td className="align-middle" style={{ width: "110px" }}>
                                    <Button className="p-1" onClick={() => { setModalShow(true); setDetailedUser(user) }}>Details</Button>
                                </td>
                            </tr>
                        )
                    }

                    ) : null}
                    {(detailedUser && modalShow) && <UserModal
                        onHide={() => { setModalShow(false); setEditUser(false) }}
                        user={detailedUser}
                        show={modalShow}
                    />}

                </tbody>
            </Table>
            <PaginationNavigationComponent table="User" pages={paginationPages} />
        </>
    )

    function ClearFilters() {
        setSearchId("");
        setSearchFirstName("");
        setSearchLastName("");
        setSearchEmail("");
        setSearchLicenses("");
        setSearchRole("");

        document.getElementById("TableRoleDropdown").value = "";
    }
}

export default UsersTableComponent;