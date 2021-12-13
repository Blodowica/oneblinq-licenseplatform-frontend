import React, { useState } from "react";
import { Form, Card, Button, InputGroup, Row, Col, Alert } from 'react-bootstrap'
import { MdEmail, MdLock } from "react-icons/md";
import { useAuth } from "../../actions";


export function ForgottenPasswordRequest({ toLogin }) {
    const [email, setEmail] = useState("")
    const [response, setResponse] = useState();

    const authActions = useAuth()

    const forgottenPassword = () => {
        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if (!validateEmail(email)) return alert("Wrong email format")


        authActions.forgottenPasswordRequest(email).then(() => {
            setResponse({ success: true, message: "We have sent you an email. Check your inbox." })
        }).catch((er) => {
            setResponse({ success: false, message: er ?? "There was an error with your request. Please try again later." })
        })
    }

    return (
        <>
            <Card className="m-0 m-lg-5 p-0 p-sm-3 p-lg-4 pb-lg-0 pb-md-0 pb-sm-0" style={{ borderRadius: 20, backgroundColor: "#EDEFFC" }}>
                <Card.Body>
                    <Button variant="outline-dark mb-3" onClick={() => toLogin()}>{"< Back"}</Button>
                    <Card.Text className="text-center display-6 mb-3">Forgotten password</Card.Text>
                    {response ?
                        <Alert variant={response.success ? "success" : "danger"}>
                            {response.message}
                        </Alert>
                        :
                        null
                    }


                    <Card.Text className="text-center text-body mb-3">We will send you an email with instructions on how to reset your password.</Card.Text>
                    <Form>

                        <InputGroup className="my-3">
                            <InputGroup.Text>
                                <MdEmail size="2em" />

                            </InputGroup.Text>
                            <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

                        </InputGroup>

                        <Row>
                            <Col className="text-center">

                                <Button onClick={() => forgottenPassword()} className="mt-2" variant="dark" size="lg">
                                    Reset password
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}