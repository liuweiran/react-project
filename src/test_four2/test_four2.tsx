/// <reference path="../../typings/tsd.d.ts" />

import * as Router from 'react-router';
const {hashHistory, IndexRoute, Route, Router } = Router;    // router是一个容器，路由通过route定义

import App from './App';
import Home from './Home';
import About from './About';
import Repos from './Repos';
import Repo from './Repo';

ReactDOM.render((
    <Router history = {hashHistory}>
        <Route path="/" component = {App}>
            <IndexRoute component = {Home} />
            <Route path="repos" component = {Repos}>
                <Route path=":userName/:repoName" component = {Repo} />
            </Route>
            <Route path="about" component = {About} />
        </Route>
    </Router>
), document.getElementById('container'));