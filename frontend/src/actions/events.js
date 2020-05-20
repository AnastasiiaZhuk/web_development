import axios from 'axios';
import {GET_EVENTS, DELETE_EVENTS, ADD_EVENT} from "./types";
import {createMessage, returnErrors} from "./messages";
import {tokenConfig} from "./auth";
//GET
export const getEvents = () => (dispatch) =>{
    axios
        .get('/events/')
        .then(res => {
            dispatch({
                type: GET_EVENTS,
                payload: res.data
            });
        }).catch(err => console.log(err));
};

export const deleteEvents =(name)=> (dispatch, getState) =>{
    axios
        .delete('http://127.0.0.1:8000/events/${name}', tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({deleteEvents: "Event deleted"}));
            dispatch({
                type:DELETE_EVENTS,
                payload: name
            });
        }).catch(err => console.log(err));
};

export const addEvents = ({name, description, date}) => dispatch =>{
    const config ={
        headers:{
            'Content-Type': 'application/json'
        },
    };
    const body = JSON.stringify({name, description, date});
    axios
        .post('http://127.0.0.1:8000/events/', body, config)
        .then((res) => {
            dispatch({
                type: ADD_EVENT,
                payload: res.data,
            });
        }).catch(err=> console.log(err));
}