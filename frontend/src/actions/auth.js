import {returnErrors} from "./messages";
import axios from 'axios';

import{
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,

} from "./types";

export const loadUser = () => (dispatch, getState) =>{
    dispatch({type: USER_LOADING});

    axios
        .get('http://127.0.0.1:8000/loginUser/', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type:USER_LOADED,
                payload: res.data,
            });
        }).catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type:AUTH_ERROR,
            });
    });

};

export const login = (username, password) => (dispatch) =>{
    const config = {
        headers:{
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({username, password});

    axios.post('http://127.0.0.1:8000/login/', body, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type:LOGIN_FAIL,
        });
    });
};

export const register = ({username, email, password, password_2}) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({username, email, password, password_2});
    axios
        .post('http://127.0.0.1:8000/register/', body, config)
        .then((res) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
        }).catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
            type:REGISTER_FAIL,
        });
    });
};
export const logout = () => (dispatch, getState) =>{
    axios
        .post('http://127.0.0.1:8000/logout/', null, tokenConfig(getState))
        .then((res) =>{
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        }).catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));

    });
};

export const tokenConfig = (getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if(token){
        config.headers['Authorization'] = 'Token ${token}';
    }
    return config;
};