import * as router from 'react-router';
const {Link} = router;

export default class ToolBarComponent extends React.Component<any, any> {
    render() {
        const { deleteUser } = this.props;
        return (
            <div>
                <Link to="/newUser">新增</Link>
                <button onClick={deleteUser}>删除所选项</button>
            </div>
        )
    }
}