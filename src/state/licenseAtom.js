import React from 'react';
import { atom } from 'recoil'

const licenseAtom = atom({
    key: 'licenseAtom',
    default: ""
})

export { licenseAtom }