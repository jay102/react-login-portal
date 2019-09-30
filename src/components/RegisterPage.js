import React from 'react';
import { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, alertActions } from '../actions';
import Response from './Response';
import Spinner from './Spinner/spinner';

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            },
            submitted: false
        };
    }
    handleChange = (event) => {
        // handle input change and dispatch register
        const { user } = { ...this.state };
        const currentState = user;
        const { name, value } = event.target;
        currentState[name] = value;
        this.setState({ user: currentState });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        // handle button click and dispatch register
        const { submitted, user } = this.state;
        const { username, password } = user;
        const { dispatch } = this.props;
        this.setState({
            submitted: !submitted,
        });
        if (username !== '' && password !== '') {
            dispatch(userActions.register(user));
        }
    }
    componentWillUnmount() {
        const { dispatch, alert } = this.props;
        alert.type !== 'alert-success' ? dispatch(alertActions.clear()) : null
    }
    render() {
        const { user, submitted } = this.state;
        const { alert, register } = this.props;
        let isSuccess, clicked;
        if (alert !== undefined && register !== undefined) {
            isSuccess = alert.type;
            clicked = register.registering
        }

        return (
            <React.Fragment>
                {isSuccess !== 'alert-success' ? <Response {...alert} /> : <Redirect to='login' />}
                <div className="col-md-6 col-md-offset-3">
                    <h2>Register</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control username" name="username" onChange={this.handleChange} value={user.username} />
                            {submitted && !user.username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" onChange={this.handleChange} value={user.password} />
                            {submitted && !user.password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Register</button>
                            {clicked ? <Spinner /> : null}
                            <Link to="/login" className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

// complete the below function
function mapStateToProps(state) {
    return {
        alert: state.alert,
        register: state.registration
    }
}

export { RegisterPage as TestRegisterPage };
export default connect(mapStateToProps)(RegisterPage)
