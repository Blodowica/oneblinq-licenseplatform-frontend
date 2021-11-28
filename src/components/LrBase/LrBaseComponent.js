import './LrBaseComponent.css'
import React, { useEffect, useState } from 'react';
import LoginComponent from '../LoginComponent/LoginComponent';
import { Button, Row, Col, Container } from 'react-bootstrap';
import RegistrationComponent from '../RegistrationComponent/RegisrationComponent';
import { useLocation } from 'react-router';


export function LrBaseComponent() {
  const [isRegister, setIsRegister] = useState(false)
  const [emailParam, setEmailParam] = useState("")
  let query = useQuery()
  
  useEffect(() => {
    let email = query.get("email")
    console.log(email)
    if(email) {
      setIsRegister(true)
      setEmailParam(email)
    }
  }, [])

  function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  return (
    <div className="Full d-flex align-items-center ">
      <div className="BackgroundLogo" />
      <Container fluid>
        <Row style={{ justifyContent: "end" }}>

          <Col sm={12} md={8} lg={6} xl={5} xxl={4} >
            {isRegister ?
              <RegistrationComponent emailParam={emailParam} toLogin={() => setIsRegister(false)} />
              :
              <LoginComponent toForgottenPassword={() => console.log("Redirect to forgotten password")} toRegister={() => setIsRegister(true)}/>
            }
          </Col>

        </Row>


      </Container>
    </div >
  )
}