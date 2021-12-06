import { atom } from "recoil"

const AccessTokenWarningAtom = atom({
    key: 'AccessTokenWarning',
    default: true
})

export {AccessTokenWarningAtom}