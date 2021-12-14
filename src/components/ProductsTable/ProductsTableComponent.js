import './ProductsTableComponent.css'
import { PaginationNavigationComponent, GlobalFilterComponent } from '../index'
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useRequestWrapper } from '../../middleware';
import { FaEdit } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation, initReactI18next } from "react-i18next";

export function ProductsTableComponent() {
    //setup i18next
    const { t } = useTranslation();
    //Recoil setup
    const paginationPageState = atom({ key: 'ProductPaginationPageState', default: 1, });
    const recordsCountState = atom({ key: 'ProductPaginationPageStateRecordsCountState', default: 10, });
    const filterSearchStringState = atom({ key: 'ProductPaginationPageStateFilterSearchStringState', default: "", });
    const filterDetailedSearchState = atom({ key: 'ProductPaginationPageStateFilterDetailedSearchState', default: false, });

    //general setup
    const [updateTable, setUpdateTable] = useState(false);
    const [products, setProducts] = useState("");
    const requestWrapper = useRequestWrapper()
    const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/`;
    //edit max uses
    const [editingRow, setEditingRow] = useState(null);
    const [newMaxUses, setNewMaxUses] = useState("");

    //Filtering
    const detailedSearch = useRecoilValue(filterDetailedSearchState);
    const recordsCount = useRecoilValue(recordsCountState);
    const searchString = useRecoilValue(filterSearchStringState);

    const [searchId, setSearchId] = useRecoilState(atom({ key: 'ProductFilterId', default: "", }));
    const [searchProductName, setSearchProductName] = useRecoilState(atom({ key: 'ProductFilterProductName', default: "", }));
    const [searchVariantname, setSearchVariantName] = useRecoilState(atom({ key: 'ProductFilterVariantName', default: "", }));
    const [searchActive, setSearchStatus] = useRecoilState(atom({ key: 'ProductFilterActive', default: "", }));
    const [searchLicenses, setSearchLicenses] = useRecoilState(atom({ key: 'ProductFilterLicenses', default: "", }));
    const [searchMaxUses, setSearchMaxUses] = useRecoilState(atom({ key: 'ProductFilterMaxUses', default: "", }));

    //Pagination
    const [paginationPages, setPaginationPages] = useState(1);
    const [paginationPage, setPaginationPage] = useRecoilState(paginationPageState);

    useEffect(() => {
        requestWrapper.post(`${baseUrl}pagination/get-Products`,
            {
                globalFilter: searchString,
                filterId: searchId,
                filterProductName: searchProductName,
                filterVariantName: searchVariantname,
                FilterActive: searchActive,
                filterLicenseCount: searchLicenses,
                filterMaxUses: searchMaxUses,
                pageNumber: paginationPage,
                pageSize: recordsCount,
            })
            .then(response => {
                setPaginationPages(response.maxPages);
                if (paginationPage > response.maxPages) {
                    setPaginationPage(1);
                }
                setProducts(response.products);
            }).catch((er) => {
                setProducts(null)
                console.log(er)
            });
    }, [searchString, searchId, searchProductName, searchVariantname, searchActive, searchLicenses, searchMaxUses, recordsCount, paginationPage, updateTable])

    //table render
    return (
        <>
            <Row className="d-flex">
                <Col xs lg="9">
                    <GlobalFilterComponent recordsCountState={recordsCountState} filterSearchStringState={filterSearchStringState} filterDetailedSearchState={filterDetailedSearchState} />
                </Col>
                <Col xs lg="3">
                    <Button variant="primary" className="p-1 d-flex ms-auto me-3" onClick={() => {
                        requestWrapper.post(`${baseUrl}product/refresh-products`)
                            .then(() => {
                                setUpdateTable(!updateTable);
                            }).catch((er) => {
                                console.log(er)
                            });
                    }}>
                        {t('dashboard_checkforupdates')}
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover responsive>
                <thead>
                    {detailedSearch ?
                        <tr>
                            <th><Form.Control type="number" style={{ width: "80px" }} onChange={(e) => setSearchId(e.target.value)} value={searchId} placeholder="ID" /></th>
                            <th><Form.Control onChange={(e) => setSearchProductName(e.target.value)} value={searchProductName} placeholder={t('dashboard_product')} /></th>
                            <th><Form.Control onChange={(e) => setSearchVariantName(e.target.value)} value={searchVariantname} placeholder={t('dashboard_product')} /></th>
                            <th><Form.Control type="number" onChange={(e) => setSearchMaxUses(e.target.value)} value={searchMaxUses} placeholder={t('dashboard_maxuses')} /></th>
                            <th><Form.Control type="number" onChange={(e) => setSearchLicenses(e.target.value)} value={searchLicenses} placeholder={t('dashboard_licenses')} /></th>
                            <th>
                                <Form.Select onChange={(e) => setSearchStatus(e.target.value)} id="TableActivationDropdown">
                                    <option value="">{t('dashboard_status')}</option>
                                    <option value="true">{t('dashboard_active')}</option>
                                    <option value="false">{t('dashboard_inactive')}</option>
                                </Form.Select>
                            </th>
                            <th><Button variant="secondary" className="p-1 text-white" onClick={() => ClearFilters()}>{t('dashboard_clear_filters')}</Button></th>
                        </tr>
                        :
                        <tr>
                            <th>ID</th>
                            <th>{t('dashboard_product')}</th>
                            <th>{t('dashboard_variant')}</th>
                            <th>{t('dashboard_maxuses')}</th>
                            <th>{t('dashboard_license')}</th>
                            <th>{t('dashboard_status')}</th>
                            <th>{t('dashboard_actions')}</th>
                        </tr>
                    }

                </thead>
                <tbody>
                    {products ?
                        products.map(product => {
                            return (
                                <tr key={product.id}>
                                    <td className="align-middle" style={{ width: "80px" }}>{product.id}</td>
                                    <td className="align-middle">{product.productName}</td>
                                    <td className="align-middle">{product.variantName}</td>
                                    <td className="align-middle">
                                        <div className="d-inline-block">
                                            {editingRow == product.id ?
                                                <Form.Control type="number" style={{ width: "70px" }} onChange={(e) => setNewMaxUses(e.target.value)} value={newMaxUses} placeholder="Max Uses" />
                                                :
                                                <>{product.maxUses}</>
                                            }
                                        </div>
                                        {editingRow == product.id ?
                                            <IoMdCheckboxOutline size={20} className="ms-2 PointOnHover" onClick={() => SaveMaxUses(product)} />
                                            :
                                            <>
                                                <FaEdit className="ms-2 PointOnHover" onClick={() => EditMaxUses(product)} />
                                            </>
                                        }
                                    </td>
                                    <td className="align-middle">{product.licenseCount}</td>
                                    <td className="align-middle">
                                        {product.active ? (
                                            <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="success">{t('dashboard_active')}</Button>
                                        ) : (
                                            <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="danger">{t('dashboard_inactive')}</Button>
                                        )}
                                    </td>
                                    <td className="align-middle" style={{ width: "110px" }}>
                                        <Button className={"p-1 btn-" + (product.active ? 'danger' : 'primary')} onClick={() => {
                                            requestWrapper.post(`${baseUrl}Product/toggle-product/${product.id}`)
                                                .then(() => {
                                                    setUpdateTable(!updateTable);
                                                }).catch((er) => {
                                                    console.log(er)
                                                });
                                        }}>
                                            {product.active ? <>{t('dashboard_disable')}</> : <>{t('dashboard_enable')}</>}
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                        : null}
                </tbody>
            </Table>
            <PaginationNavigationComponent paginationPages={paginationPages} paginationPageState={paginationPageState} />
        </>
    )

    function EditMaxUses(product) {
        setNewMaxUses(product.maxUses);
        setEditingRow(product.id);
    }

    function SaveMaxUses(product) {
        product.maxUses = newMaxUses;
        setEditingRow(null);
        requestWrapper.post(`${baseUrl}Product/${product.id}/${newMaxUses}`)
            .then(() => {
                setUpdateTable(!updateTable);
            }).catch((er) => {
                console.log(er)
            });
    }

    function ClearFilters() {
        setSearchId("");
        setSearchProductName("");
        setSearchVariantName("");
        setSearchMaxUses("");
        setSearchLicenses("");
        setSearchStatus("");

        document.getElementById("TableActivationDropdown").value = "";
    }
}

export default ProductsTableComponent;