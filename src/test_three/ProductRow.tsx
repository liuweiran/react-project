export default class ProductRow extends React.Component<any, any> {
    render() {
        const {product} = this.props;
        const name = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        )
    }
}