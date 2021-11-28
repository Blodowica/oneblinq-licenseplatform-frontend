import { useHistory } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { authAtom } from '../state';
import { useRequestWrapper } from '../middleware';

export function useAuth() {
    const baseUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/account`;
    const requestWrapper = useRequestWrapper()
    const setAuth = useSetRecoilState(authAtom)
    const history = useHistory()

    return {
        login,
        register,
        logout,
        refreshToken
    }

    var timeout

    function startRefreshTokenTimer(jwt) {
        // Calculate when to call refresh token refresh
        const tokenExp = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64'));
        const expires = new Date(tokenExp.exp * 1000);
        const timeoutSec = expires.getTime() - Date.now() - (60 * 1000);
        console.log(`${timeoutSec / 1000} s before next JWT fetch call`)
        timeout = setTimeout(() => refreshToken(), timeoutSec)
    }

    function login(email, password) {
        return requestWrapper.post(`${baseUrl}/login`, { email, password, })
            .then(user => {
                setAuth(user);
                startRefreshTokenTimer(user.token)
                console.log("Successful authentication")
                history.push('/dashboard?table=licenses')

                // get return url from location state or default to home page
                //const { from } = history.location.state || { from: { pathname: '/' } };
                //history.push(from);
            }).catch((er) => {
                setAuth(null)
                history.replace('/')
                alert(er)
            });
    }

    function register(email, password, firstName, lastName) {
        return requestWrapper.post(`${baseUrl}/register`, { email, password, firstName, lastName})
            .then(user => {
                setAuth(user);
                startRefreshTokenTimer(user.token)
                console.log("Successful register")
                history.push('/example')

                // get return url from location state or default to home page
                //const { from } = history.location.state || { from: { pathname: '/' } };
                //history.push(from);
            }).catch((er) => {
                setAuth(null)
                alert(er)
            });
    }

    function refreshToken() {
        return requestWrapper.post(`${baseUrl}/refresh-token`).then(user => {
            setAuth(user);
            //startRefreshTokenTimer(user.token)
        }).catch(() => {
            setAuth(null)
        })
    }

    function logout() {
        requestWrapper.post(`${baseUrl}/revoke-cookie`).then(res => {
            //lobby.connection?.stop()
            clearTimeout(timeout)
            setAuth(null)
        })
    }
}