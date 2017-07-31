import NavLink from './NavLink';

export default class AppComponent extends React.Component<any, any> {
    render() {
        return (
            <div>
                <h1>React Route Tutorial</h1>
                <ul role="nav">
                    <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/Repos">Repos</NavLink></li>
                </ul>
                {this.props.children}   {/*代表子组件*/}
            </div>
        )
    }
}