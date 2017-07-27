export default class ProductCategoryRow extends React.Component<any, any> {
    render() {
        const { category } = this.props;
        return (<tr><th colSpan="2">{category}</th></tr>)
    }
}