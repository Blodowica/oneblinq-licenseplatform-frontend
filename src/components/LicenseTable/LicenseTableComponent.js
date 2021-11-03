import './LicenseTableComponent.css'
import { Table, Button, Badge, } from 'react-bootstrap';

export function LicenseTableComponent() {

    return (
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
                <th>ID</th>
                <th>License</th>
                <th>Email</th>
                <th>Activations</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr>{/*introduce logic to grab info from back end and create a row for each new unit */}
                <td>1</td>
                <td>ASDF-GHJK-ZXCV-QWER</td>
                <td>thomasmolen@gmail.com</td>
                <td>1/4</td>
                <td>
                    <Badge bg="success">Active</Badge>
                </td>
                <td>
                    <Button variant="primary">Details</Button>{' '}
                </td>
            </tr>
        </tbody>
        </Table>
    )
}

export default LicenseTableComponent;