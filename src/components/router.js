import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';

import * as Components from './index';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../actions';
import { Spinner } from 'react-bootstrap';
import { authAtom } from '../state';
import { useRecoilValue } from 'recoil';
import jwt_decode from 'jwt-decode';


const Routes = () => {
    const authActions = useAuth()
    const [isLoading, setIsLoading] = useState(true)
    const authState = useRecoilValue(authAtom)

    useEffect(() => {
        authActions.refreshToken().then(x => setIsLoading(false))
    }, [])

    if (isLoading) {
        return (
            <div style={{ justifyContent: "center", textAlign: "center" }}>
                <Spinner animation="border" style={{ fontSize: 500 }} />
            </div>
        )
    }

    function RoleBasedPath() {
        let role = jwt_decode(authState.token).role
 
        if (role == 'User') {
            return (
                <Components.UserDashboard />
            )
        }
        else {
            return (
                <Components.DashboardBaseComponent />
            )
        }
    }


    return (
        <main>
            <Switch>
                {!authState &&
                    <Route path={['/login', '/']} component={Components.LrBaseComponent} />
                }
                    <RoleBasedPath />
            </Switch>
        </main>
    )
}

export default Routes