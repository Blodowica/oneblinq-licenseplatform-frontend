import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useRecoilValue } from 'recoil'
import { authAtom } from '../state';

function ProtectedRoute({ Component, ...restOfProps }) {
    const auth = useRecoilValue(authAtom)

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                auth ? <Component {...props} /> : <Redirect to="/" />
            }
        />
    );
}

export default ProtectedRoute;