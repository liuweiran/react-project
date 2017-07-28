import { Provider } from 'react-redux';
import { createStore } from 'redux';
import counter from './reducers';
const store = createStore(counter);

import Index from './Index';

export default class App extends React.Component<any, any> {
    render() {
        return (
            <Provider store={store}>
                <Index />
            </Provider>
        )
    }
}