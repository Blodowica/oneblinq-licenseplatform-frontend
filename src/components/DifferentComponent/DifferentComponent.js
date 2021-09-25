import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { textState } from '../../state'

export function DifferentComponent() {
    const [globalTextState, setGlobalTextState] = useRecoilState(textState)

    return (
        <div>
            <div>
                <p>{globalTextState}</p>
            </div>
        </div>
    )
}