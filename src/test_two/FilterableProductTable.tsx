import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

export default class FilterableProductTable extends React.Component<any, any> {
    constructor(props) {
        super(props);   // There is only one reason when one needs to pass props to super(): When you want to access this.props in constructor.
        this.state = { 'filterText':'', inStockOnly:false };
        this.handleChangeFilterText = this.handleChangeFilterText.bind(this);
        this.handleChangeInStockOnly = this.handleChangeInStockOnly.bind(this);
    }

    componentWillMount():void {
        console.log('FilterableProductTable -> componentWillMount');
    }

    componentDidMount():void {
        console.log('FilterableProductTable -> componentDidMount');
    }

    private handleChangeFilterText = (v) => {
        this.setState({filterText: v});
    };

    private handleChangeInStockOnly = (v) => {
        this.setState({inStockOnly: v})
    };

    render() {
        const {products} = this.props;

        return (
            <div>
                <SearchBar filterText = { this.state.filterText }
                           inStockOnly = { this.state.inStockOnly }
                           handleChangeFilterText = { this.handleChangeFilterText }
                           handleChangeInStockOnly = { this.handleChangeInStockOnly }
                />
                <ProductTable products = { products }
                              filterText = { this.state.filterText }
                              inStockOnly = { this.state.inStockOnly }
                />
            </div>
        )
    }
}