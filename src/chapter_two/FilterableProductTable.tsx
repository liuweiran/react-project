/**
 * Created by Gene on 16/3/11.
 */

import SearchBar from './SearchBar';
import ProductTable from './ProductTable'

class FilterableProductTable extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {'filterText':'',inStockOnly:false};
        this.handleChangeFiltext= this.handleChangeFiltext.bind(this);
        this.handleChangeInStockOnly = this.handleChangeInStockOnly.bind(this);
    }

    private mSearhBar;

    componentWillMount():void {
        console.log("FilterableProductTable->componentWillMount");
    }

    componentDidMount():void {
        console.log("FilterableProductTable->componentDidMount");
        this.mSearhBar = this.refs['mSearhBar'] as SearchBar;
    }

    private handleChangeFiltext(newValue) {
        this.setState({filterText: newValue})
    }

    private handleChangeInStockOnly(v) {
        this.setState({inStockOnly: v})
    }

    render() {
        const {products} = this.props;

        return (
            <div>
                <SearchBar ref="mSearchBar"
                           filterText={this.state.filterText}
                           inStockOnly={this.state.inStockOnly}
                           handleChangeFiltext={this.handleChangeFiltext}
                           handleChangeInStockOnly={this.handleChangeInStockOnly}
                />
                <ProductTable products={products} />
            </div>
        )
    }
}

export default FilterableProductTable;