import NavLink from './NavLink';

export default class Repos extends React.Component<any, any> {
    render() {
        return (
            <div>
                <h2>Repos</h2>
                <ul>
                    <li><NavLink to="/repos/rackt/react-router">React Router</NavLink></li>
                    <li><NavLink to="/repos/facebook/react">React</NavLink></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}