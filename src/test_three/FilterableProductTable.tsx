import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

export default class FilterableProductTable extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {'filterText': '', inStockOnly: false};
    }

    private handleUserInput = (filterText, inStockOnly) => {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    };

    render() {
        const {products} = this.props;

        return (
            <div>
                <SearchBar
                    filterText = {this.state.filterText}
                    inStockOnly = {this.state.inStockOnly}
                    onUserInput = {this.handleUserInput}
                />
                <ProductTable
                    products = {products}
                    filterText = {this.state.filterText}
                    inStockOnly = {this.state.inStockOnly}
                />
            </div>
        )
    }
}