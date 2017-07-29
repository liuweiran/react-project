import { Provider } from 'react-redux'; // 让容器组件拿到state
import { createStore } from 'redux';    // createStore用于生成store；createStore函数接受另一个函数作为参数，返回新生成的store对象
import counter from './reducers';
const store = createStore(counter); // 整个应用只能有一个store；store.dispatch方法会触发reducer的自动执行，store需要知道reducer函数，所以在生成store的时候，将reducer传入createStore方法

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