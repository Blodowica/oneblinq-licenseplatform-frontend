import './UsersTableComponent.css'
import { Table, Row, Col, Container, Tab, Card } from 'react-bootstrap';

import LicenseTableComponent from '../LicenseTable/LicenseTableComponent';

export function UsersTableComponent() {
    

    return (
        <Table striped responsive bordered hover size="sm">
        <thead>
            <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>ID</td>
                <td>Email</td>
                <td>Name</td>
                <td>Date of Birth</td>
                <td>Status</td>
                <td>Actions</td>
            </tr>
            <tr>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
            </tr>
        </tbody>
        </Table>
    )
}

export default UsersTableComponent;