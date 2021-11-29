import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import { Sugar } from 'react-preloaders2';

import * as Components from './index';
import { useAuth } from '../actions';
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


    function RoleBasedPath() {
        let role = jwt_decode(authState.token).role

        if (role == 'User') {
            return (
                <Components.UserDashboard/>
            )
        } else {
            return (
                <Components.DashboardBaseComponent/>
            )
        }
    }


    return (
        <main>
            <Sugar customLoading={isLoading} background="#010115" color="#b2b2b2" time={0}/>
            <Switch>
                {!authState &&
                <Route path={['/login', '/']} component={Components.LrBaseComponent}/>
                }
                <Route path={'/profile'} component={Components.UserProfilePageComponent}/>
                <RoleBasedPath/>
            </Switch>
        </main>
    )
}

export default Routes