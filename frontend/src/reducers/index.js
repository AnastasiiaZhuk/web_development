import {combineReducers} from "redux";
import events from './events';
import messages from "./messages";
import errors from "./errors";
import auth from "./auth";
export default combineReducers({
  events,
  errors,
  messages,
  auth,

});