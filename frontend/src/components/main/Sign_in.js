import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from "../../actions/auth";

export class Sign_in extends Component {

    state = {
        username: '',
        password: ''
    };
    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };
    onChange = (e) => this.setState({[e.target.name]: e.target.value});

    render() {
        const {username, password} = this.state;

        return (

            <div className="sign-in" id="sign">
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <h2 className="active"> Sign In </h2>
                        <h2 className="inactive underlineHover"><a className="a1" href="Sign_up.js">Sign Up </a></h2>
                        <div className="sign_in">
                            <form id="login_form" onSubmit={this.onSubmit}>
                                <input type="text" className="fadeIn second" name="username"
                                       required maxLength="150" id="login" value={username}
                                       onChange={this.onChange}/>
                                <input type="password" className="fadeIn third"
                                       name="password" required id="login1"
                                       value={password} onChange={this.onChange}/>
                                <input type="submit" value="Log in"/>
                                <input type="hidden" name="next" value="{{ next }}"/>
                            </form>
                            <p>
                                Not a member?
                                <a href="#sign-up1">Register</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
        isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login})(Sign_in);
