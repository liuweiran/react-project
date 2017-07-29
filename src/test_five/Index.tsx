import { bindActionCreators } from 'redux'; // 将actions集合下的action和dispatch组合
import { connect } from 'react-redux';  // 从UI组件生成容器组件
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

function mapStateToProps(state) {
    return {
        value: state.count
    }
}

function mapDispatchProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchProps)(Index);

// mapStateToProps 输入逻辑：外部的数据（state对象）如何转换为UI组件的参数；mapStateToProps的第一个参数总是state对象，第二个参数代表容器组件的props对象
// mapDispatchProps 输出逻辑：用户发出的动作如何变更为action对象，从UI组件传出去
// index是UI组件