import * as Router from 'react-router';
const {Link} = Router;

export default class NavLink extends React.Component<any, any> {
    render() {
        return <Link {...this.props} activeClassName="active" />
    }
}