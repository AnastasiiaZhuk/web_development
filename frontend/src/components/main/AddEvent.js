import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addEvents} from "../../actions/events";
//


export class AddEvent extends Component {
    constructor(props) {
        super(props);

        this.getCookie = this.getCookie.bind(this);
    }
    getCookie(name){
        let cookieValue = null;
        if(document.cookie && document.cookie !== ''){
            let cookies = document.cookie.split(';');
            for(let i = 0; i<cookies.length; i++){
                let cookie = jQuery.trim(cookies[i]);
                if( cookie.substring(0, name.length + 1) === (name + '=')){
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    addevent(name1, description1, date1){

        let token = localStorage.getItem('token');
        const headers = {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token${token}`,
        };
        const body = {
            name: name1,
            description: description1,
            date: date1

        };
        fetch('http://127.0.0.2:8000/events/', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers,
        })
            .then((data) => data.json())
            .then(() =>{
            alert("Added");
            })
            .catch(() => {
                alert("Added");
            })
    }
    //
    // state = {
    //     name: '',
    //     description: '',
    //     date: ''
    // };
    //
    // static propTypes = {
    //     addEvents: PropTypes.func.isRequired,
    // };


    // onChange = (e) => this.setState({[e.target.name]: e.target.value});
    //
    // onSubmit = (e) =>{
    //     e.preventDefault();
    //     const {name, description, date} = this.state;
    //     const event = {name, description, date};
    //     this.props.addEvents({name, description, date});
    //     this.setState({
    //         name:'',
    //         description: '',
    //         date: '',
    //     });
    // };

    render() {


        return(
            <div className="add-event" id="add-event1">
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <h1>Add an Event</h1>
                        <form id="event_form" onSubmit={(e) =>{
                            e.preventDefault();
                            let na = e.target.querySelector('#title').value;
                            let de = e.target.querySelector('#description').value;
                            let da = e.target.querySelector('#date').value;
                            this.addevent(na, de, da);
                            e.target.querySelector('#title').value = '';
                            e.target.querySelector('#description').value ='';
                            e.target.querySelector('#date').value = '';
                        }}>
                            <p>

                                <input type="text" id="title" className="fadeIn second"  name="name"
                                />
                                <input type="text" id="description"  name = 'description' className="fadeIn third"
                                />
                                <input type="date" id="date" className="fadeIn fourth" name="date"
                                />
                            </p>
                            <input type="submit" name="Submit" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddEvent;