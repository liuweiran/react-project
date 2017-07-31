import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchPosts } from '../actions/logon.action';

class LogonComponent extends React.Component<any, any> {

    private handleClickLogon = () => {
        const { fetchPosts } = this.props,
            node = this.refs['userNameInput'],
            userName = node['value'].trim();

        if (userName) {
            fetchPosts(userName);
        } else {
            alert('user name cannot be blank');
        }
    };

    render() {
        return (
            <div>
                <h1>Logon Form</h1>
                <input type="text" ref="userNameInput" placeholder="user name"/>
                <button onClick={this.handleClickLogon}>登陆</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        res: state.logonReducer.res,
        isFetching: state.logonReducer.isFetching
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchPosts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LogonComponent);