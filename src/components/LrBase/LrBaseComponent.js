import './LrBaseComponent.css'
import React from 'react';
import LoginComponent from '../LoginComponent/LoginComponent';
import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

export function LrBaseComponent() {

  return (
   
    <div className="Full d-flex align-items-center justify-content-center">
        <div className="BackgroundLogo"> 
        </div>
      <LoginComponent/>
    </div>
  )
}