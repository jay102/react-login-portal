import React from 'react';
import { Router, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute.js';
import { history } from './helpers';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // console.log(
            //     `The current URL is ${location.pathname}`
            // );
            // console.log(`The last navigation action was ${action}`);
        });
    }
    componentWillUnmount() {
        const unlisten = this.history;
        unlisten()
    }
    render() {
        return (
            <Router history={history}>
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <PrivateRoute path="/" exact component={HomePage} />
                        <Route path="/login" exact component={LoginPage} />
                        <Route exact path="/register" component={RegisterPage} />
                    </div>
                </div>
            </Router>
        );
    }
}
export { App }