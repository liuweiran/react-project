import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';

export default class ProductTable extends React.Component<any, any> {
    render() {
        const {products} = this.props;
        let rows = [],
            lastCategory = null;

        products.forEach(function(product){
           if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
               return;
           }

           if (product.category !== lastCategory) {
               rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
           }

           rows.push(<ProductRow product={product} key={product.name} />);
           lastCategory = product.category;

        }.bind(this));

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}