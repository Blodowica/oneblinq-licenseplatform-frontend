// import React, { useEffect } from 'react';
// import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
//
// import * as Components from './index';
// import ProtectedRoute from './ProtectedRoute';
// import { useAuth } from '../actions';
// import { Spinner } from 'react-bootstrap';
// import { authAtom } from '../state';
// import { useRecoilValue } from 'recoil';
//
//
// const Routes = () => {
//     const authActions = useAuth()
//     const authState = useRecoilValue(authAtom)
//
//     useEffect(() => {
//         authActions.refreshToken()
//     }, [])
//
//
//     return (
//         <main>
//             <Switch>
//                 {/*<ProtectedRoute path='/profile'>*/}
//                 {/*    <Components.UserProfilePageComponent />*/}
//                 {/*</ProtectedRoute>*/}
//                 {/*<ProtectedRoute path='/dashboard'>*/}
//                 {/*    <Components.DashboardBaseComponent />*/}
//                 {/*</ProtectedRoute>*/}
//                 <ProtectedRoute path='/dashboard'>
//                     <Components.UserProfilePageComponent />
//                 </ProtectedRoute>
//                 <ProtectedRoute path='/users'>
//                     <Components.UsersTableComponent />
//                 </ProtectedRoute>
//
//                 {authState ?
//                     // <Route path='*' component={Components.DashboardBaseComponent} />
//                     <Route path='*' component={Components.UserProfilePageComponent} />
//                     :
//                     <Route path='*' component={Components.LrBaseComponent} />
//                 }
//             </Switch>
//         </main>
//     )
// }
//
// export default Routes

import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';

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
                <Spinner animation="border" style={{ fontSize: 500 }} />
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