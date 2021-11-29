import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import { Sugar } from 'react-preloaders2';

import * as Components from './index';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../actions';
import { Spinner } from 'react-bootstrap';
import { authAtom } from '../state';
import { useRecoilValue } from 'recoil';


const Routes = () => {
    const authActions = useAuth()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        authActions.refreshToken().then(x => setIsLoading(false))
    }, [])

    if (isLoading) {
        return (
            <div style={{justifyContent: "center", textAlign: "center"}}>
                <Sugar customLoading={isLoading} background="#010115" color="#b2b2b2" time={0}/>
            </div>
        )
    }


    return (
        <main>
            <Switch>
                <ProtectedRoute path='/profile'>
                    <Components.UserProfilePageComponent />
                </ProtectedRoute>
                <ProtectedRoute path='/dashboard'>
                    <Components.DashboardBaseComponent />
                </ProtectedRoute>
                <ProtectedRoute path='/users'>
                    <Components.UsersTableComponent />
                </ProtectedRoute>
                <Route path={['/login', '/']} component={Components.LrBaseComponent} />
            </Switch>
        </main>
    )
}

export default Routes