import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register
};

function login(username, password) {
    // return the promise using fetch which adds to localstorage on resolve
    const user = { username, password }

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }

    return async function dispatch(dispatch) {
        dispatch(request(user));
        try {
            const res = await userService.login(username, password);
            dispatch(success(res));
            dispatch(alertActions.success("Login successful"));
            localStorage.setItem('user', user);
        } catch (err) {
            console.log(err);
            dispatch(alertActions.error(err))
            dispatch(failure(err));
        }
    }
}

function logout() {
    // complete this function


}

function register(user) {
    // return the promise using fetch which dispatches appropriately 
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }

    return async function dispatch(dispatch) {
        dispatch(request(user));
        try {
            const res = await userService.register(user);
            dispatch(success(res));
            dispatch(alertActions.success("Registration successful"))
        } catch (err) {
            console.log(err);
            dispatch(alertActions.error(err))
            dispatch(failure(err));
        }
    }



}
