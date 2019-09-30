import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute.js';
import { history } from './helpers';
import { alertActions } from './actions';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            console.log(
                `The current URL is ${location.pathname}`
            );
            console.log(`The last navigation action was ${action}`);
        });
    }
    componentWillUnmount() {
        const unlisten = this.history;
        unlisten()
    }
    render() {
        const { alert } = this.props;
        return (
            <Router history={history}>
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {/* <Switch> */}
                        <PrivateRoute path="/" exact component={HomePage} />
                        <Route path="/login" exact component={LoginPage} />
                        <Route exact path="/register" component={RegisterPage} />
                        {/* </Switch> */}
                    </div>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

export { App }
//export default connect(mapStateToProps)(App)