import * as Router from 'react-router';
const {Link} = Router;  // Link组件是<a>元素的react版本，用于跳转路由

export default class NavLink extends React.Component<any, any> {
    render() {
        return <Link {...this.props} activeClassName="active" />
    }
}