export default class ProductRow extends React.Component<any, any> {
    render() {
        const {product} = this.props;
        const name = product.stocked ? product.name : <span style={{color: 'red'}}>{product.name}</span>;  // react组件样式是一个对象，第一重括号是js语法，第二重括号表示样式对象
        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        )
    }
}