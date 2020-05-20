import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {register} from "../../actions/auth";
import {createMessage} from "../../actions/messages";

export class Sign_up extends Component{
    state = {
        username: '',
        password: '',
        password_2: '',
        email: '',

    };
    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };
    onSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, password_2} = this.state;
        if(password !== password_2){
            this.props.createMessage({passwordNotMatch: 'Password not match'});

        }
        else{
            const newUser = {
                username,
                email,
                password,
                password_2,

            };
            this.props.register(newUser
               );
        }

    };
    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    render(){
        const {username, email, password, password_2} = this.state;
    return(
        <div className="sing-up" id="sign-up1">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                        <h2 className="active"> Sign Up </h2>
                        <h2 className="inactive underlineHover"> <a className="a1" href="#sign">Sign in</a> </h2>
                        <form role="form" onSubmit={this.onSubmit}>
                             <input type="text"  className="fadeIn second" name="username" id="id_username"
                                                                                  required maxLength="150"  value={username} onChange={this.onChange} />
                             <input type="email" className="fadeIn fourth"
                                                                                    name="email" required id="id_email" value={email} onChange={this.onChange}/>
                             <input type="password" className="fadeIn third"
                                                                                  name="password" required id="id_password1" value={password} onChange={this.onChange}/>
                             <input type="password" className="fadeIn fifth"
                                                                                  name="password_2" required id="id_password2" value={password_2} onChange={this.onChange}/>
                            <input type="submit" name="Submit"  value="Submit"/>
                        </form>
                        <p>
                            You a member?
                            <a href="Sign_in.js">Login</a>
                        </p>
                </div>
            </div>
        </div>
    )}
}
const mapStateProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,

})
export default connect(mapStateProps, {register, createMessage})(Sign_up);