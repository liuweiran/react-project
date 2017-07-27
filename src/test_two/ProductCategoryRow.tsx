export default class ProductCategoryRow extends React.Component<any, any> {
    componentWillMount():void {
        console.log('ProductCategoryRow -> componentWillMount');
    }

    componentDidMount():void {
        console.log('ProductCategoryRow -> componentDidMount');
    }

    render() {
        const {category} = this.props;
        return (<tr><th colSpan="2">{category}</th></tr>)
    }
}