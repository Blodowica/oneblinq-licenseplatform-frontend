import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useRecoilValue } from 'recoil'
import { authAtom } from '../state';

function ProtectedRoute({ children, ...rest }) {
    const auth = useRecoilValue(authAtom)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default ProtectedRoute;