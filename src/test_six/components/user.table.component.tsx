import UserTableRowComponent from './user.table.row.component';

export default class UserTableComponent extends React.Component<any, any> {

    render() {
        const { users, modifyUserProperty, openUserFormAction } = this.props;
        let rows = [];
        users.forEach(function(user, index){

            rows.push(
                <UserTableRowComponent
                    user={user}
                    seq={index}
                    key={user.id}
                    modifyUserProperty={modifyUserProperty}
                    openUserFormAction={openUserFormAction}
                />);
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th> </th>
                        <th>seq</th>
                        <th>username</th>
                        <th>age</th>
                        <th>oper</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}