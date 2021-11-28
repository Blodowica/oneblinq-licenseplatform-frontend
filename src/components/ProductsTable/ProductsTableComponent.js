import './ProductsTableComponent.css'
import { PaginationNavigationComponent, GlobalFilterComponent } from '../index'
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useRequestWrapper } from '../../middleware';
import { FaEdit } from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import "react-datepicker/dist/react-datepicker.css";

export function ProductsTableComponent() {
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
                        Check for updates
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover responsive>
                <thead>
                    {detailedSearch ?
                        <tr>
                            <th><Form.Control type="number" style={{ width: "80px" }} onChange={(e) => setSearchId(e.target.value)} value={searchId} placeholder="ID" /></th>
                            <th><Form.Control onChange={(e) => setSearchProductName(e.target.value)} value={searchProductName} placeholder="Product" /></th>
                            <th><Form.Control onChange={(e) => setSearchVariantName(e.target.value)} value={searchVariantname} placeholder="Product" /></th>
                            <th><Form.Control type="number" onChange={(e) => setSearchMaxUses(e.target.value)} value={searchMaxUses} placeholder="Max Uses" /></th>
                            <th><Form.Control type="number" onChange={(e) => setSearchLicenses(e.target.value)} value={searchLicenses} placeholder="Licenses" /></th>
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
                            <th>Product</th>
                            <th>Variant</th>
                            <th>Max Uses</th>
                            <th>Licenses</th>
                            <th>Status</th>
                            <th>Actions</th>
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
                                                <>{ product.maxUses }</>
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
                                            <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="success">Active</Button>
                                        ) : (
                                            <Button className="ps-1 pe-1 pt-0 pb-0 NotClickable" variant="danger">Inactive</Button>
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
                                            {product.active ? <>Disable</> : <>Enable</>}
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