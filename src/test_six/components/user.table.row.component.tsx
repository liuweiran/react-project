export default class UserTableRowComponent extends React.Component<any, any> {

    private handleSelect = () => {
        const { modifyUserProperty } = this.props;
        modifyUserProperty(
            this.refs['seq']['innerHTML'],
            this.refs['checkbox']['checked']
        );
    };

    private handleOpenUserForm = () => {
        const { openUserFormAction, user, seq } = this.props;
        openUserFormAction(user, seq);
    };

    render() {
        const {user, seq} = this.props;
        return (
            <tr>
                <td>
                    <input type="checkbox" onClick={this.handleSelect} ref="checkbox" />
                </td>
                <td ref="seq">{seq}</td>
                <td ref="username">{user.userName}</td>
                <td ref="age">{user.age}</td>
                <td><button onClick={this.handleOpenUserForm}>编辑</button></td>
            </tr>
        );
    }
}