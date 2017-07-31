import { createStore, compose, applyMiddleware } from 'redux';  // compose 从右到左把接收到的函数合成后的最终函数； applyMiddleware 添加中间件，增强store.dispatch()的功能；
import { Provider} from 'react-redux';
import * as router from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';    // syncHistoryWithStore 结合store同步导航事件；
import thunk from 'redux-thunk';    // 中间件，改造store.dispatch，使其可以接受函数作为参数（正常store.dispatch的参数只能是action对象）
import createLogger from "redux-logger";    // redux-logger提供一个生成器createLogger

import reducer from './reducers';
import LogonComponent from './components/logon.component';
import ManagerComponent from './components/manager.component';
import UserFormComponent from './components/user.form.component';

const { Router, Route, hashHistory } = router;
const logger = createLogger();  //生成日志中间件，在发送action前后打印日志
const store = createStore(reducer, compose(
    applyMiddleware(
        thunk,
        logger,
        routerMiddleware(hashHistory)
    ),
    window['devToolsExtension'] ? window['devToolsExtension']() : f => f
));
const history = syncHistoryWithStore(hashHistory, store);   // 创建一个增强版的history来结合store同步导航事件

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