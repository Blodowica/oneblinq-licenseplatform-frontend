import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import * as Components from './index';
import ProtectedRoute from './ProtectedRoute';
import { useRecoilValue } from 'recoil'
import { authAtom } from '../state';
import { useAuth } from '../actions';


const Routes = () => {
    const authActions = useAuth()
    const authState = useRecoilValue(authAtom)
    const history = useHistory()
    useEffect(() => {
        authActions.refreshToken()
    }, [])

    useEffect(() => {
        if(authState) {
            history.push('/dashboard')
        }
        else {
            history.replace('/')
        }
    }, [authState])

    return (
        <main>
            <Switch>
                {authState ?
                    <ProtectedRoute exact path='/dashboard' Component={Components.DashboardBaseComponent} />
                    :
                    <Route exact path={["/login", "/"]} component={Components.LrBaseComponent} />
                }
            </Switch>
        </main>
    )
}

export default Routes