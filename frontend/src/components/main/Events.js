import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getEvents, deleteEvents} from "../../actions/events";

export class Events extends Component {
    static propTypes ={
        events: PropTypes.array.isRequired,
        getEvents: PropTypes.func.isRequired,
        deleteEvents: PropTypes.func.isRequired,

    }
    componentDidMount() {
        this.props.getEvents();
    }


    render(){
        return(
            <div className="parallax" style={{backgroundColor: "#41B3A3"}}>
                <div className="list-type" id="events-div">
                    <h1>
                        Events for
                        you!
                    </h1>
                    <ol id="ourcontainer"  >

                        {this.props.events.map(event =>(
                          <li> {event.name} </li>
                        ))}
                    </ol>

                </div>
            </div>
        )

    }
}
const  mapStatesToProp = state => ({
    events: state.events.events,
});
export default connect(mapStatesToProp,{getEvents, deleteEvents})(Events);
// export default Events;