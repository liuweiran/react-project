import About from './about';
import Inbox from './inbox';

export default class App extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {route: window.location.hash.substr(1)}
    }

    componentDidMount():void {
        window.addEventListener('hashChange', () => {
            console.log(0);
            this.setState({
                route: window.location.hash.substr(1)
            })
        }, false);
    }

    render() {
        let Child;
        switch(this.state.route) {
            case '/about':
                Child = About;
                break;
            case '/inbox':
                Child = Inbox;
                break;
        }
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><a href="#/about">About</a></li>
                    <li><a href="#/inbox">Inbox</a></li>
                </ul>
                <Child/>
            </div>
        )
    }
}