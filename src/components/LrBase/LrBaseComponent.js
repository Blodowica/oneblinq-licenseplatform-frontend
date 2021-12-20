import './LrBaseComponent.css'
import React, { useEffect, useState } from 'react';
import LoginComponent from '../LoginComponent/LoginComponent';
import { Button, Row, Col, Container } from 'react-bootstrap';
import RegistrationComponent from '../RegistrationComponent/RegisrationComponent';
import { useLocation } from 'react-router';
import { ForgottenPasswordRequest, ForgottenPasswordVerify } from '../ForgottenPassword';
import { useQuery } from '../../actions';


export function LrBaseComponent() {
  const [toWhere, setToWhere] = useState("login")
  const [emailParam, setEmailParam] = useState("")
  const [tokenParam, setTokenParam] = useState("")
  let query = useQuery()

  useEffect(() => {
    let email = query.get("email")
    let token = query.get("token")

    // In case both params are there avoid redirection
    if(email && token) return;

    if (email) {
      setToWhere("register")
      setEmailParam(email)
    }


    if(token) {
      setToWhere("verifyforgottenpassword")
      setTokenParam(token)
    }

  }, [])

  function loadComponent() {
    switch (toWhere) {
      case "register":
        return <RegistrationComponent emailParam={emailParam} toLogin={() => setToWhere("login")} />
      case "login":
        return <LoginComponent toForgottenPassword={() => setToWhere("forgottenpassword")} toRegister={() => setToWhere("register")} />
      case "forgottenpassword":
        return <ForgottenPasswordRequest toLogin={() => setToWhere("login")} />
        case "verifyforgottenpassword":
          return <ForgottenPasswordVerify token={tokenParam} />
    }
  }



  return (
    <div className="Full d-flex align-items-center ">
      <div className="BackgroundLogo" />
      <Container fluid>
        <Row style={{ justifyContent: "end" }}>

          <Col sm={12} md={8} lg={6} xl={5} xxl={4} >
            {loadComponent()}
          </Col>
        </Row>
      </Container>
    </div >
  )
}