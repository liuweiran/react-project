import { createStore, compose, applyMiddleware } from 'redux';
import { Provider} from 'react-redux';
import * as router from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import createLogger from "redux-logger";    // 日志中间件

import reducer from './reducers';
import LogonComponent from './components/logon.component';
import ManagerComponent from './components/manager.component';
import UserFormComponent from './components/user.form.component';

const { Router, Route, hashHistory } = router;
const logger = createLogger();
const store = createStore(reducer, compose(
    applyMiddleware(
        thunk,
        logger,
        routerMiddleware(hashHistory)
    ),
    window['devToolsExtension'] ? window['devToolsExtension']() : f => f
));
const history = syncHistoryWithStore(hashHistory, store);

export default class AppComponent extends React.Component <any, any> {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path="/" component={LogonComponent}/>
                    <Route path="/manager" component={ManagerComponent}/>
                    <Route path="/newUser" component={UserFormComponent}/>
                    <Route path="/modifyUser/:seq" component={UserFormComponent}/>
                </Router>
            </Provider>
        )
    }
}