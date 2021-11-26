import { Row } from 'react-bootstrap';
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri";
import { useRecoilState } from 'recoil';

export function PaginationNavigationComponent({ paginationPages, paginationPageState }) {
    const [paginationPage, setPaginationPage] = useRecoilState(paginationPageState);

    return (
        <Row className="d-flex pe-4 overflow-auto">
            <ul className="pagination justify-content-end">
                <li className="page-item PointOnHover">
                    <a className="page-link" onClick={() => PreviousPage()}><RiArrowLeftLine /></a>
                </li>
                {(paginationPage < 3 || paginationPages == 3) ?
                    <></>
                    :
                    <>
                        <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(1)}>1</a></li>
                    </>
                }
                {paginationPage == 1 ?
                    <>
                        <li className="page-item disabled"><a className="page-link">1</a></li>
                        {paginationPages > 1 &&
                            <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(2)}>2</a></li>
                        }
                        {paginationPages > 2 &&
                            <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(3)}>3</a></li>
                        }
                    </>
                    :
                    <>
                        {paginationPage == paginationPages ?
                            <>
                                <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(paginationPage - 2)}>{paginationPage - 2}</a></li>
                                <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(paginationPage - 1)}>{paginationPage - 1}</a></li>
                                <li className="page-item disabled"><a className="page-link">{paginationPage}</a></li>
                            </>
                            :
                            <>
                                <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(paginationPage - 1)}>{paginationPage - 1}</a></li>
                                <li className="page-item disabled"><a className="page-link">{paginationPage}</a></li>
                                <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(paginationPage + 1)}>{paginationPage + 1}</a></li>
                            </>
                        }
                    </>
                }
                {(paginationPages < 4) || (paginationPage > paginationPages - 2) ?
                    <></>
                    :
                    <>
                        <li className="page-item PointOnHover"><a className="page-link" onClick={() => setPaginationPage(paginationPages)}>{paginationPages}</a></li>
                    </>
                }
                <li className="page-item PointOnHover">
                    <a className="page-link PointOnHover" onClick={() => { NextPage() }}><RiArrowRightLine /></a>
                </li>
            </ul>
        </Row>
    );

    function NextPage() {
        if (paginationPage + 1 <= paginationPages) {
            setPaginationPage(paginationPage + 1);
        }
    }

    function PreviousPage() {
        if (paginationPage - 1 > 0) {
            setPaginationPage(paginationPage - 1);
        }
    }
}