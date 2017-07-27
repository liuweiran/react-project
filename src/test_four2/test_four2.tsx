/// <reference path="../../typings/tsd.d.ts" />

import * as Router from 'react-router';
const {hashHistory, IndexRoute, Route, Router} = Router;

import App from './App';
import Home from './Home';
import About from './About';
import Repos from './Repos';
import Repo from './Repo';

ReactDOM.render((
    <Router history = {hashHistory}>
        <route path="/" component = {App}>
            <IndexRoute component = {Home} />
            <Route path="/repos" component = {Repos}>
                <Route path=":userNmae/:repoName" component = {Repo} />
            </Route>
            <Route path="/about" component = {About} />
        </route>
    </Router>
), document.getElementById('container'));