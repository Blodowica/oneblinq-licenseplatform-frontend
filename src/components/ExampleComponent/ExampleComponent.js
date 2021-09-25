import logo from '../../logo.svg';
import './ExampleComponent.css'
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {textState} from '../../state'

import {textActions} from '../../actions'

export function ExampleComponent() {
  const [text, setText] = useState("Default textsss")
  const [globalTextState, setGlobalTextState] = useRecoilState(textState)



  
  // On component load, OR component destroy
  useEffect(() => {

    // On component render
    // We make some ASYNC call here // We wait for response
    // Meanwhile component unloaded

  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="example-text">
          Example component, have fun.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <p>{globalTextState}</p>
        <button onClick={() => {
          setGlobalTextState("New global state")
        }}>CLick me to change global state for all components :)</button>
        {/* <input onChange={(theInputField) => setText(theInputField.target.value)}></input> */}
      </header>
    </div>
  )
}