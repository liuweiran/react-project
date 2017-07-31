import { createStore } from 'redux';    // createStore用于生成store；createStore函数接受另一个函数作为参数，返回新生成的store对象
import { Provider } from 'react-redux'; // 让容器组件拿到state
import reducer from './reducers';
const store = createStore(reducer); // store对象是保存数据的地方，包含所有数据，store.getState()可得到某个时点的数据；整个应用只能有一个store；store.dispatch方法会触发reducer的自动执行，store需要知道reducer函数，所以在生成store的时候，将reducer传入createStore方法

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