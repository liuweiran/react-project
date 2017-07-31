import { bindActionCreators } from 'redux'; // store.dispatch(action)是view发出action的唯一方法；bindActionCreators将actions集合下的action和dispatch组合
import { connect } from 'react-redux';  // 连接redux, 将UI组件转成容器组件，可从 Redux store 中指定准确的 state 到你想要获取的组件中
import * as Actions from './actions';

class Index extends React.Component<any, any> {
    render() {
        const {value, increment, decrement} = this.props;
        return (
            <div>
                <span>{value}</span>
                <button onClick={increment}>Increase</button>
                <button onClick={decrement}>Decrement</button>
            </div>
        )
    }
}

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {   // 将state中的数据作为props绑定到组件上
    return {
        value: state.count
    }
}

function mapDispatchProps(dispatch) {   // 将action作为props绑定到组件上
    return bindActionCreators(Actions, dispatch);   // Actions是action集合(actionCreators返回action)，dispatch等同于store中的store.dispatch；返回一个包含所有action的可直接dispatch的同名函数对象
}

export default connect(mapStateToProps, mapDispatchProps)(Index);
// mapStateToProps 建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系；mapStateToProps的第一个参数总是state对象，第二个参数代表容器组件的props对象。
// mapDispatchProps 用来建立 UI 组件的参数到store.dispatch方法的映射；该函数应该返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。
// index是UI组件