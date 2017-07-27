export default class ProductRow extends React.Component<any, any> {

    componentWillMount():void {
        console.log('ProductRow -> componentWillMount');
    }

    componentDidMount():void {
        console.log('ProductRow -> componentDidMount');
    }

    render() {
        const {product} = this.props;

        let name = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        )
    }
}