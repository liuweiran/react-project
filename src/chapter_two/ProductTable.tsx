/**
 * Created by Gene on 16/3/11.
 */

import ProductCategoryRow from './ProductCategoryRow'
import ProductRow from './ProductRow'

class ProductTable extends React.Component<ProductTableProps, any> {

    render() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product){
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category="product.category" key={product.category} />)
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        });

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
        );
    }
}

export default ProductTable;