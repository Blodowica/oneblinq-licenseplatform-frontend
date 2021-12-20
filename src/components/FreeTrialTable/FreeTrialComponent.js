import { forwardRef, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { FaEdit } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRequestWrapper } from '../../middleware';
import { TableAmountAtom, TableFiltersAtom, TablePageAtom, TableSearchToggleAtom } from '../../state';
import { GlobalFilterComponent, PaginationNavigationComponent } from '../index';
import './FreeTrialComponent.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function FreeTrialComponent() {
    //setup i18next
    const { t } = useTranslation();

    //general setup
    const requestWrapper = useRequestWrapper()
    const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/`;

    const [updateTable, setUpdateTable] = useState(false);
    const [freeTrials, setFreeTrials] = useState("");

    //filtering delay
    const [timer, setTimer] = useState(null);
    const isMounted = useRef(false);

    //edit end date
    const [editingRow, setEditingRow] = useState(null);
    const [newEndDate, setNewEndDate] = useState(new Date());

    //datePicker Form
    const DatePickerStartDateForm = forwardRef(({ value, onClick }, ref) => (
        <Form.Control value={value} onChange={() => { }} placeholder="Starts at" onClick={onClick} />
    ));
    const DatePickerEndDateForm = forwardRef(({ value, onClick }, ref) => (
        <Form.Control value={value} onChange={() => { }} placeholder="Ends at" onClick={onClick} />
    ));
    const DatePickerSetEndDate = forwardRef(({ value, onClick }, ref) => (
        <Form.Control value={value} onChange={() => { }} placeholder="End date" onClick={onClick} />
    ));
    //Filtering
    const detailedSearch = useRecoilValue(TableSearchToggleAtom("FreeTrial"));
    const recordsCount = useRecoilValue(TableAmountAtom("FreeTrial"));
    const searchString = useRecoilValue(TableFiltersAtom("FreeTrial"));

    const [searchId, setSearchId] = useRecoilState(TableFiltersAtom("FreeTrialId"));
    const [searchUserId, setSearchUserId] = useRecoilState(TableFiltersAtom("FreeTrialUserId"));
    const [searchPluginName, setSearchPluginName] = useRecoilState(TableFiltersAtom("FreeTrialPluginName"));
    const [searchPlatform, setSearchPlatform] = useRecoilState(TableFiltersAtom("FreeTrialPlatform"));
    const [searchStartDate, setSearchStartDate] = useRecoilState(TableFiltersAtom("FreeTrialStartDate"));
    const [searchEndDate, setSearchEndDate] = useRecoilState(TableFiltersAtom("FreeTrialEndDate"));
    const [searchActive, setSearchActive] = useRecoilState(TableFiltersAtom("FreeTrialActive"));

    //Pagination
    const [paginationPages, setPaginationPages] = useState(1);
    const [paginationPage, setPaginationPage] = useRecoilState(TablePageAtom("FreeTrial"));

    function FetchFreeTrials() {
        requestWrapper.post(`${baseUrl}pagination/get-FreeTrials`,
            {
                globalFilter: searchString,
                filterId: searchId,
                FilterUniqueUserId: searchUserId,
                FilterPlatform: searchPlatform,
                FilterPluginName: searchPluginName,
                FilterStartDate: searchStartDate,
                FilterEndDate: searchEndDate,
                FilterActive: searchActive,
                pageNumber: paginationPage,
                pageSize: recordsCount,
            })
            .then(response => {
                setPaginationPages(response.maxPages);
                if (paginationPage > response.maxPages) {
                    setPaginationPage(1);
                }
                response.records.forEach(trial => {
                    var displayStartDate = new Date(Date.parse(trial.startDate));
                    var displayEndDate = new Date(Date.parse(trial.endDate));
                    trial.displayStartDate = `${displayStartDate.getDate()}-${displayStartDate.getMonth() + 1}-${displayStartDate.getFullYear()}`;
                    trial.displayEndDate = `${displayEndDate.getDate()}-${displayEndDate.getMonth() + 1}-${displayEndDate.getFullYear()}`;
                    trial.active = Date.parse(trial.endDate) > new Date().valueOf();
                });
                setFreeTrials(response.records);
                console.log(response.records);
            }).catch((er) => {
                setFreeTrials(null)
                console.log(er)
            });
    }

    useEffect(() => {
        FetchFreeTrials();
    }, [recordsCount, paginationPage, updateTable, searchActive, searchStartDate, searchEndDate])

    useEffect(() => {
        clearTimeout(timer);
        isMounted.current ? setTimer(setTimeout(() => { FetchFreeTrials() }, 300)) : isMounted.current = true;
    }, [searchString, searchId, searchUserId, searchPluginName, searchPlatform])

    //table render
    return (
        <>
            <Row className="d-flex">
                <Col xs lg="9">
                    <GlobalFilterComponent table="FreeTrial" />
                </Col>
            </Row>
            <Table striped bordered hover responsive>
                <thead>
                    {detailedSearch ?
                        <tr>
                            <th><Form.Control type="number" style={{ width: "80px" }} onChange={(e) => setSearchId(e.target.value)} value={searchId} placeholder="ID" /></th>
                            <th><Form.Control onChange={(e) => setSearchPluginName(e.target.value)} value={searchPluginName} placeholder="Plugin" /></th>
                            <th><Form.Control onChange={(e) => setSearchPlatform(e.target.value)} value={searchPlatform} placeholder="Platform" /></th>
                            <th><Form.Control onChange={(e) => setSearchUserId(e.target.value)} value={searchUserId} placeholder="User ID" /></th>
                            <th className="FreeTrialDatePickerTH">
                                <DatePicker
                                    selected={searchStartDate}
                                    onChange={(date) => {
                                        setSearchStartDate(date);
                                    }}
                                    customInput={<DatePickerStartDateForm />}
                                    dateFormat="dd-MM-yyyy"
                                    showPopperArrow={false}
                                    isClearable={true}
                                    clearIcon={null}
                                />
                            </th>
                            <th className="FreeTrialDatePickerTH">
                                <DatePicker
                                    selected={searchEndDate}
                                    onChange={(date) => {
                                        setSearchEndDate(date);
                                    }}
                                    customInput={<DatePickerEndDateForm />}
                                    dateFormat="dd-MM-yyyy"
                                    showPopperArrow={false}
                                    isClearable={true}
                                    clearIcon={null}
                                />
                            </th>
                            <th>
                                <Form.Select onChange={(e) => setSearchActive(e.target.value)} id="TableActivationDropdown" value={searchActive}>
                                    <option value="">Status</option>
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </Form.Select>
                            </th>
                            <th><Button variant="secondary" className="p-1 text-white" onClick={() => ClearFilters()}>{t('dashboard_clear_filters')}</Button></th>
                        </tr>
                        :
                        <tr>
                            <th>ID</th>
                            <th>Plugin</th>
                            <th>Platform</th>
                            <th>User ID</th>
                            <th>Starts</th>
                            <th>Ends</th>
                            <th>Status</th>
                            <th>{t('dashboard_actions')}</th>
                        </tr>
                    }

                </thead>
                <tbody>
                    {freeTrials ?
                        freeTrials.map(freeTrial => {
                            return (
                                <tr key={freeTrial.id}>
                                    <td className="align-middle" style={{ width: "80px" }}>{freeTrial.id}</td>
                                    <td className="align-middle">{freeTrial.pluginName}</td>
                                    <td className="align-middle">{freeTrial.platform}</td>
                                    <td className="align-middle">{freeTrial.uniqueUserId}</td>
                                    <td className="align-middle">{freeTrial.displayStartDate}</td>
                                    <td className="align-middle ">
                                        <div className="d-inline-block">
                                            {editingRow == freeTrial.id ?
                                                <div className="FreeTrialDatePickerTH2">
                                                    <DatePicker
                                                        selected={newEndDate}
                                                        onChange={(date) => {
                                                            setNewEndDate(date);
                                                        }}
                                                        customInput={<DatePickerSetEndDate />}
                                                        dateFormat="dd-MM-yyyy"
                                                        showPopperArrow={false}
                                                        clearIcon={null}
                                                    />
                                                </div>
                                                :
                                                <>{freeTrial.displayEndDate}</>
                                            }
                                        </div>
                                        {editingRow == freeTrial.id ?
                                            <IoMdCheckboxOutline size={20} className="ms-2 PointOnHover" onClick={() => SaveEndDate(freeTrial)} />
                                            :
                                            <>
                                                <FaEdit className="ms-2 PointOnHover" onClick={() => EditEndDate(freeTrial)} />
                                            </>
                                        }
                                    </td>
                                    <td className="align-middle">
                                        {freeTrial.active ? (
                                            <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="success">{t('dashboard_active')}</Button>
                                        ) : (
                                            <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="danger">{t('dashboard_inactive')}</Button>
                                        )}
                                    </td>
                                    <td className="align-middle" style={{ width: "110px" }}>
                                        <Button className={"p-1 btn-" + (freeTrial.active ? 'danger' : 'primary')} onClick={() => {
                                            requestWrapper.post(`${baseUrl}FreeTrial/toggle-trial/${freeTrial.id}`)
                                                .then(() => {
                                                    setUpdateTable(!updateTable);
                                                }).catch((er) => {
                                                    console.log(er)
                                                });
                                        }}>
                                            {freeTrial.active ? <>{t('dashboard_disable')}</> : <>{t('dashboard_enable')}</>}
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                        : null}
                </tbody>
            </Table>
            <PaginationNavigationComponent table="FreeTrial" pages={paginationPages} />
        </>
    )

    function EditEndDate(trial) {
        setNewEndDate(Date.parse(trial.endDate));
        setEditingRow(trial.id);
    }

    function SaveEndDate(trial) {
        setEditingRow(null);

        requestWrapper.post(`${baseUrl}FreeTrial/set-end-date/${trial.id}`, {newEndDate: new Date(newEndDate)})
            .then(() => {
                setUpdateTable(!updateTable);
            }).catch((er) => {
                console.log(er)
            });
    }

    function ClearFilters() {
        setSearchId("");
        setSearchPlatform("");
        setSearchPluginName("");
        setSearchUserId("");
        setSearchStartDate(null);
        setSearchEndDate(null);
        setSearchActive("");

        document.getElementById("TableActivationDropdown").value = "";
    }
}

export default FreeTrialComponent;