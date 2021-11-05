import './LicenseTableComponent.css'
import { Table, Button, Badge, } from 'react-bootstrap';
import { licenseAtom } from '../../state';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useRequestWrapper } from '../../middleware';

export function LicenseTableComponent() {
    const [licenses, setLicenses] = useRecoilState(licenseAtom);
    const requestWrapper = useRequestWrapper()
    const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/License`;

    useEffect(() => {
        requestWrapper.get(`${baseUrl}`)
            .then(licenses => {
                setLicenses(licenses);
                console.log(licenses);
            }).catch((er) => {
                setLicenses(null)
                console.log(er)
            });
    }, [])

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
                    {licenses && licenses.map(license => {
                        return (
                            <tr key={licenses.licenseId}>
                                <td>{license.licenseId}</td>
                                <td>{license.licenseKey}</td>
                                <td>{license.email}</td>
                                <td>{`${license.activations}/${license.maxUses}`}</td>
                                <td>
                                    {license.active ? (
                                        <Badge bg="success">Active</Badge>

                                    ) : (
                                        <Badge bg="danger">Inactive</Badge>
                                    )}
                                </td>
                                <td>
                                    <Button variant="primary">Details</Button>{' '}
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </Table>
    )
}

export default LicenseTableComponent;