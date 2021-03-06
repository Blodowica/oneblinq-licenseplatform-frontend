import { useRecoilState } from 'recoil';
import { Row, Col, Form } from 'react-bootstrap';
import { MdOutlineManageSearch } from "react-icons/md";
import { useTranslation, initReactI18next } from "react-i18next";
import { TableAmountAtom, TableFiltersAtom, TableSearchToggleAtom } from '../../state';

export function GlobalFilterComponent({ table }) {
  const [recordsCount, setRecordsCount] = useRecoilState(TableAmountAtom(table));
  const [searchString, setSearchString] = useRecoilState(TableFiltersAtom(table));
  const [detailedSearch, setDetailedSearch] = useRecoilState(TableSearchToggleAtom(table));
  const { t } = useTranslation();
  return (
    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
      <Col lg="5" sm="12">
        <Row className="d-flex">
          <Col xs="2" md="3" style={{ paddingRight: "5px", width: "95px" }}>
            <Form.Select onChange={(e) => setRecordsCount(e.target.value)} value={recordsCount}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </Form.Select>
          </Col>
          <Col style={{ paddingLeft: "0px", width: "400px", maxWidth: "450px" }} className="d-flex align-items-center">
            <Form.Control onChange={(e) => setSearchString(e.target.value)} value={searchString} placeholder={t('navigation_searchbar')} />
            <MdOutlineManageSearch size="35px" className={"ms-1 DetailedSearchIcon" + (detailedSearch ? " DetailedSearchIconOn" : "")} onClick={() => setDetailedSearch(!detailedSearch)} />
          </Col>
        </Row>
      </Col>
    </Form.Group>
  );
}