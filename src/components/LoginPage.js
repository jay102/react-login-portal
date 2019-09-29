import React from 'react';
import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, alertActions } from '../actions';
import Response from './Response';
import Spinner from './Spinner/spinner';

export class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset login status

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
    }
    handleChange = (e) => {
        const { name } = e.target;
        this.setState({ [name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password, submitted } = this.state;
        const { dispatch } = this.props;
        this.setState({ submitted: !submitted })
        if (username !== '' && password !== '') {
            dispatch(userActions.login(username, password));
        }
    }
    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(alertActions.clear())
    }
    render() {
        const { username, password, submitted } = this.state;
        const { alert, authentication } = this.props;
        let isSuccess, clicked;
        if (authentication !== undefined) {
            isSuccess = authentication.loggedIn;
            clicked = authentication.loggingIn
        }
        return (
            <React.Fragment>
                {!isSuccess ? <Response {...alert} /> : <Redirect to='/' />}
                <div className="col-md-6 col-md-offset-3">
                    <h2>Login</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control username" name="username" onChange={this.handleChange} value={username} />
                            {submitted && !username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" onChange={this.handleChange} value={password} />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Login</button>
                            {clicked ? <Spinner /> : null}
                            <Link to="/register" className="btn btn-link">Register</Link>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        authentication: state.authentication
    }
}

export { LoginPage as TestLoginPage };
export default connect(mapStateToProps)(LoginPage);