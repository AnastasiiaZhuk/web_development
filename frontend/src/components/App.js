import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import Header from './layout/Header';
import './App.css';
import Sign_in from "./main/Sign_in";
import Sign_up from "./main/Sign_up";
import Calendar from "./main/Calendar";
import Events from "./main/Events";
import Event from './main/Event';
import {AddEvent} from "./main/AddEvent";
import {Provider} from 'react-redux';

import store from '../store';

import MyCarousel from "./main/csrftoken";



class App extends Component{

    render(){
        return(
            <Provider store={store}>
                <Fragment>
                    <Header/>
                    <MyCarousel/>
                    <Calendar/>
                    <Events id="section3"/>
                    <Sign_in/>
                    <AddEvent/>
                    <Sign_up/>
                    <Event/>
                </Fragment>
            </Provider>

        );

    }
}

ReactDOM.render(<App />, document.getElementById('app'));