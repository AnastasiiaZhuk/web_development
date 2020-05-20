import React, {Component} from 'react';
import {Link, animateScroll as scroll} from 'react-scroll';

export class Header extends Component{

    render(){

        return(
            <ul className="snip1217">
                <li className="current"><a href="/templates/events/first_page.html"> Main </a></li>
                <li><a href="#add-event1">Add a new event</a></li>
                <li><a href="#sign">Sign Up</a></li>
                <li><a href="#events-div"> Events</a></li>
                <li><a href="#"> Participants</a></li>
            </ul>
        )
    }
}
export default Header;
