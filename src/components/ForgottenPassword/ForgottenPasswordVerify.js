import React, { useState } from "react";
import { Form, Card, Button, InputGroup, Row, Col, Alert } from 'react-bootstrap'
import { MdEmail, MdLock } from "react-icons/md";
import { useAuth } from "../../actions";


export function ForgottenPasswordVerify({ token }) {
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [response, setResponse] = useState();

    const authActions = useAuth()

    function verifyForgottenPassword() {
        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        function arePasswordsSame() {
            if (password && repeatPassword && password == repeatPassword) {
                return true
            }
            return false
        }

        if (!validateEmail) return alert("Wrong email format")
        if (!password || password.length < 5) return alert("Password needs to be 5+ characters long")
        if (!arePasswordsSame()) return alert("Passwords aren't same")

        authActions.forgottenPasswordVerify(token, password).then(() => {
            setResponse({ success: true, message: "You have successfully changed your password!" })
        }).catch((er) => {
            setResponse({ success: false, message: er ?? "There was an error with your request. Please try again later." })
        })
    }

    return (
        <>
            <Card className="m-0 m-lg-5 p-0 p-sm-3 p-lg-4 pb-lg-0 pb-md-0 pb-sm-0" style={{ borderRadius: 20, backgroundColor: "#EDEFFC" }}>
                <Card.Body>
                    <Card.Text className="text-center display-6 mb-3">Change password</Card.Text>
                    {response ?
                        <Alert variant={response.success ? "success" : "danger"}>
                            {response.message}
                        </Alert>
                        :
                        null
                    }


                    <Card.Text className="text-center text-body mb-3">Please change your password</Card.Text>
                    <Form>

                        <InputGroup className="my-3">
                            <InputGroup.Text>
                                <MdLock size="2em" />

                            </InputGroup.Text>
                            <Form.Control value={password} type="password" placeholder="******" onChange={(e) => setPassword(e.target.value)} />

                        </InputGroup>


                        <InputGroup className="my-3">
                            <InputGroup.Text>
                                <MdLock size="2em" />

                            </InputGroup.Text>
                            <Form.Control value={repeatPassword} type="password" placeholder="******" onChange={(e) => setRepeatPassword(e.target.value)} />
                        </InputGroup>

                        <Row>
                            <Col className="text-center">

                                <Button onClick={() => verifyForgottenPassword()} className="mt-2" variant="dark" size="lg">
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