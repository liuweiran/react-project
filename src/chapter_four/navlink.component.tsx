/**
 * Created by Gene on 16/3/15.
 */

import * as Router from 'react-router';
const {Link} = Router;

class NavLinkComponent extends React.Component<any, any> {
    render() {
        return <Link {...this.props}  activeClassName="active" />
    }
}

export default NavLinkComponent;