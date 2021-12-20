import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { MdEmail, MdLock, MdPeople, MdPerson } from "react-icons/md";
import { useAuth } from "../../actions";
import "./RegistrationComponent.css";

function RegistrationComponent({ toLogin, emailParam }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const authActions = useAuth()

  useEffect(() => {
    setEmail(emailParam)
  }, [])

  function arePasswordsSame() {
    if (password && repeatPassword && password == repeatPassword) {
      return true
    }
    return false
  }

  function register() {
    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    if (!validateEmail) return alert("Wrong email format")
    if (!password || password.length < 5) return alert("Password needs to be 5+ characters long")
    if (!arePasswordsSame()) return alert("Passwords aren't same")
    if (!firstName || !lastName) return alert("First name and last name fields are mandatory")

    authActions.register(email, password, firstName, lastName)
  }

  return (
    <>
      <Card className="m-0 m-lg-5 p-0 p-sm-3 p-lg-4 pb-lg-0 pb-md-0 pb-sm-0" style={{ borderRadius: 20, backgroundColor: "#EDEFFC" }}>
        <Card.Body>
          <Card.Text className="text-center display-3 mb-3">Register</Card.Text>
          <Form>

            <Row className="mb-3   mt-5">
              <Form.Group as={Col} controlId="formGridFirstName" >
                <InputGroup>
                  <InputGroup.Text>
                    <MdPerson size="2em" />
                  </InputGroup.Text>

                  <Form.Control value={firstName} placeholder=" First name" onChange={(e) => setFirstName(e.target.value)} />
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridLastName">
                <InputGroup>
                  <InputGroup.Text>
                    <MdPeople size="2em" />
                  </InputGroup.Text>
                  <Form.Control value={lastName} placeholder="Last name" onChange={(e) => setLastName(e.target.value)} />

                </InputGroup>
              </Form.Group>
            </Row>

            <InputGroup className="my-3">
              <InputGroup.Text>
                <MdEmail size="2em" />

              </InputGroup.Text>
              <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />

            </InputGroup>

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

                <Button onClick={() => register()} className="rounded-pill" style={{ paddingLeft: "30px", paddingRight: "30px", backgroundColor: "#6933C8", color: "white" }} variant="register" size="lg">
                  Register
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">

                <Button onClick={() => toLogin()} className="mt-2" variant="none" size="lg">
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default RegistrationComponent;
