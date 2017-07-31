import { compose, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducer from './reducers';
import AsycApp from './AsyncApp';

const logger = createLogger();
const store = createStore(reducer, compose(
    applyMiddleware(thunk, logger),
    window['devToolsExtension'] ? window['devToolsExtension']() : f => f
));

export default class AppComponent extends React.Component<any, any> {
    render() {
        return (
            <Provider store={store}>
                <AsycApp />
            </Provider>
        )
    }
}