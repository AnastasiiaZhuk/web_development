import React, {Component} from 'react';
import {deleteEvents} from "../../actions/events";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class Event extends Component {
    static propTypes ={
        events: PropTypes.array.isRequired,

    }


    state = {
        title: '',
        description: '',
        date: ''
    }
    delete_event = event =>{
        fetch('http://127.0.0.1:8000/events/')
    }
    render(){
        return(
            <div className="event-info">
                <div className="wrapper_div fadeInDown">
                    <div id="formContent">
                        <input type="text" name="title" id="title1" placeholder="title"/>
                        <input type="text" name="description" required id="description1"/>
                        <input type="date" name="date" required id="date1"/>
                        <div className="buttons">
                           <buttom name="Delete">

                           </buttom>
                            <button name="Get"  > Get </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const  mapStatesToProp = state => ({
    events: state.events.events,
});
export default connect(mapStatesToProp,{deleteEvents})(Event);