import React from 'react';
import {
  atom,
} from 'recoil';

const textState = atom({
    key: 'myTextState',
    default: "MyFuckingState"
})

export {textState}