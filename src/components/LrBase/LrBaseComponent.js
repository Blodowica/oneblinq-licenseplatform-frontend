import './LrBaseComponent.css'
import React from 'react';

import { Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import RegistrationComponent from '../RegistrationComponent/RegisrationComponent';
export function LrBaseComponent() {

  return (
    
    <div className="Full d-flex align-items-center justify-content-center">
        <div className="BackgroundLogo"> 
        
        </div>
      
      <RegistrationComponent />
    </div>
  )
}