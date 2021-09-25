import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import { textState } from '../state'



function textActions() {
    
    return {
        setGlobalTextState,
    }
    
    
    function setGlobalTextState() {

    }
}

export { textActions }