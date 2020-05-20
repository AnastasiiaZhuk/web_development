import {GET_EVENTS, DELETE_EVENTS} from '../actions/types.js'
import {ADD_EVENT} from "../actions/types";

const  initialState ={

    events: [],
};

export default function (state=initialState, action) {
    switch (action.type) {
        case GET_EVENTS:
            return{
                ...state,
                events: action.payload
            };
        case DELETE_EVENTS:
            return{
                ...state,
                events: state.events.filter(event => event.name !== action.payload)
            };
        case ADD_EVENT:
            return {
                ...state,
                events:[...state.events, action.payload],
            };
        default:
            return state;
    }
}