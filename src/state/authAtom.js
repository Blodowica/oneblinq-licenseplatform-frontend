import React from 'react';
import { atom } from 'recoil'

const authAtom = atom({
    key: 'authAtom',
    default: ""
})

export { authAtom }