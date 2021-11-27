import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import * as Components from './index';
import ProtectedRoute from './ProtectedRoute';
import { useRecoilValue } from 'recoil'
import { authAtom } from '../state';
import { useAuth } from '../actions';
import jwt_decode from 'jwt-decode';


const Routes = () => {
    const authActions = useAuth()
    const authState = useRecoilValue(authAtom)
    const history = useHistory()
    useEffect(() => {
        authActions.refreshToken()
    }, [])

    useEffect(() => {
        if (authState) {
            var decoded = jwt_decode(authState.token);
            if (decoded.role == "User") {
                history.push('/dashboard')
            }
            else {
                history.push('/userdashboard')
            }
        }
        else {
            history.replace('/')
        }
    }, [authState])

    return (
        <main>
            <Switch>
                =
                {authState ?
                    <>
                        <ProtectedRoute exact path='/userdashboard' Component={Components.UserDashboard} />
                        <ProtectedRoute exact path='/dashboard' Component={Components.DashboardBaseComponent} />
                    </>
                    :
                    <Route exact path={["/login", "/"]} component={Components.LrBaseComponent} />
                }
            </Switch>
        </main>
    )
}

export default Routes