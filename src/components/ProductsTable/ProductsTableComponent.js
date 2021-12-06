import { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
import { FaEdit } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import { useRecoilState, useRecoilValue } from 'recoil';
import { useRequestWrapper } from '../../middleware';
import { TableAmountAtom, TableFiltersAtom, TablePageAtom, TableSearchToggleAtom } from '../../state';
import { GlobalFilterComponent, PaginationNavigationComponent } from '../index';
import './ProductsTableComponent.css';

export function ProductsTableComponent() {
    //setup i18next
    const { t } = useTranslation();

    //general setup
    const requestWrapper = useRequestWrapper()
    const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/`;

    const [updateTable, setUpdateTable] = useState(false);
    const [products, setProducts] = useState("");

    //filtering delay
    const [timer, setTimer] = useState(null);
    const isMounted = useRef(false);

    //edit max uses
    const [editingRow, setEditingRow] = useState(null);
    const [newMaxUses, setNewMaxUses] = useState("");

    //Filtering
    const detailedSearch = useRecoilValue(TableSearchToggleAtom("Product"));
    const recordsCount = useRecoilValue(TableAmountAtom("Product"));
    const searchString = useRecoilValue(TableFiltersAtom("Product"));

    const [searchId, setSearchId] = useRecoilState(TableFiltersAtom("ProductId"));
    const [searchProductName, setSearchProductName] = useRecoilState(TableFiltersAtom("ProductName"));
    const [searchVariantname, setSearchVariantName] = useRecoilState(TableFiltersAtom("ProductVariant"));
    const [searchStatus, setSearchStatus] = useRecoilState(TableFiltersAtom("ProductStatus"));
    const [searchLicenses, setSearchLicenses] = useRecoilState(TableFiltersAtom("ProductLicenses"));
    const [searchMaxUses, setSearchMaxUses] = useRecoilState(TableFiltersAtom("ProductMaxUses"));

    //Pagination
    const [paginationPages, setPaginationPages] = useState(1);
    const [paginationPage, setPaginationPage] = useRecoilState(TablePageAtom("Product"));

    function FetchProducts() {
        requestWrapper.post(`${baseUrl}pagination/get-Products`,
            {
                globalFilter: searchString,
                filterId: searchId,
                filterProductName: searchProductName,
                filterVariantName: searchVariantname,
                FilterActive: searchStatus,
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
    }

    useEffect(() => {
        FetchProducts();
    }, [recordsCount, paginationPage, updateTable, searchStatus])

    useEffect(() => {
        clearTimeout(timer);
        isMounted.current ? setTimer(setTimeout(() => { FetchProducts() }, 300)) : isMounted.current = true;
    }, [searchString, searchId, searchProductName, searchVariantname, searchLicenses, searchMaxUses])

    //table render
    return (
        <>
            <Row className="d-flex">
                <Col xs lg="9">
                    <GlobalFilterComponent table="Product" />
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
                                <Form.Select onChange={(e) => setSearchStatus(e.target.value)} id="TableActivationDropdown" value={searchStatus}>
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
                            <th>{t('dashboard_product')}</th>
                            <th>{t('dashboard_variant')}</th>
                            <th>{t('dashboard_maxuses')}</th>
                            <th>{t('dashboard_license')}</th>
                            <th>Status</th>
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
            <PaginationNavigationComponent table="Product" pages={paginationPages}/>
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