import React, { useEffect } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';

import * as Components from './index';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../actions';
import { Spinner } from 'react-bootstrap';
import { authAtom } from '../state';
import { useRecoilValue } from 'recoil';


const Routes = () => {
    const authActions = useAuth()
    const authState = useRecoilValue(authAtom)

    useEffect(() => {
        authActions.refreshToken()
    }, [])


    return (
        <main>
            <Switch>
                <ProtectedRoute path='/dashboard'>
                    <Components.DashboardBaseComponent />
                </ProtectedRoute>
                <ProtectedRoute path='/users'>
                    <Components.UsersTableComponent />
                </ProtectedRoute>


                {/* Fallback, in case pathname doesn't exist as a component */}
                {authState ?
                    <Route path='*' component={Components.DashboardBaseComponent} />
                    :
                    <Route path='*' component={Components.LrBaseComponent} />
                }
            </Switch>
        </main>
    )
}

export default Routes