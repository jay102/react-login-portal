import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions/index';

class HomePage extends Component {

    logout = () => {
        const { dispatch } = this.props;
        dispatch(userActions.logout())
    }
    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2 align="center">Welcome! You have successfully logged in.</h2>
                <p align="center">
                    <Link onClick={this.logout} to="/">Logout</Link>
                </p>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return state;
}
export { HomePage }
export default connect(mapStateToProps)(HomePage);