import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addUserAction, modifyUserPropertyAction } from '../actions/manager.action';

class NewUserComponent extends React.Component<any, any> {

    private handlerAddUser = () => {
        const { addUserAction } = this.props;
        addUserAction(
            this.refs['username']['value'],
            this.refs['age']['value']
        );
    };

    private handlerModifyUser = () => {
        const { modifyUserPropertyAction, params } = this.props;
        modifyUserPropertyAction(
            this.refs['username']['value'],
            this.refs['age']['value'],
            params.seq
        );
    };

    render() {
        const { route, user } = this.props;
        const isNewUser = (route.path === '/newUser');
        return (
            <div>
                <input ref="username" placeholder="username" defaultValue={isNewUser ? '' : user.userName}/>{' '}
                <input ref="age" placeholder="age" defaultValue={isNewUser ? '' : user.age}/>
                <button onClick={isNewUser ? this.handlerAddUser : this.handlerModifyUser}>save</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state.managerReducer;
    return {
        user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addUserAction, modifyUserPropertyAction}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserComponent);