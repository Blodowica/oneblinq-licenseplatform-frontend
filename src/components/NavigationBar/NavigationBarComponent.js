import './NavigationBarComponent.css'
import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logo from '../../assets/Logo.svg';
import { MdLanguage, MdPerson } from "react-icons/md";
import { useAuth } from "../../actions";
import i18next from 'i18next';
import { useTranslation, initReactI18next } from "react-i18next";

export function NavigationBarComponent() {
  const authActions = useAuth()
  const navDropdownTitle = (<MdLanguage color="white" size="2em" />);
  const { t } = useTranslation();
  return (
    <Navbar bg="dark">
      <Navbar.Brand href="/dashboard" className="OneBlinqLogo p-0">
        <img
          src={logo}
          width="290px"
          className="d-inline-block ms-5"
          alt="OneBlinq logo"
        />
      </Navbar.Brand>
      <Container fluid className="d-flex justify-content-end me-2">
        <NavDropdown
          title={
            <MdPerson color="white" size="2em" />
          }
          id="basic-nav-dropdown">
          <NavDropdown.Item href="/profile">{t('navigationbar_profile')}</NavDropdown.Item>
          <NavDropdown.Item href="./" onClick={() => authActions.logout()}>{t('navigationbar_logout')}</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown align="end" title={navDropdownTitle} variant="dark" className="LanguageDropdownIcon">
          <NavDropdown.Item href="#action/3.1" onClick={() => i18next.changeLanguage('nl')}>{t('navigationbar_dutch')}</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4" onClick={() => i18next.changeLanguage('en')}> {t('navigationbar_english')}</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar >
  )
}
