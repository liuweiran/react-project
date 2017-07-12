/**
 * Created by Gene on 16/3/14.
 */

import * as Router from 'react-router';
const {Link, IndexLink} = Router;

import NavLink from './navlink.component';

class AppComponent extends React.Component<any, any> {

    render() {
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul role="nav">
                    <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/repos">Repos</NavLink></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

export default AppComponent;