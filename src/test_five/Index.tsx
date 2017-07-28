import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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