export default class SearchBar extends React.Component<any, any> {

    componentWillMount():void {
        console.log('SearchBar -> componentWillMount');
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
    }

    componentDidMount():void {
        console.log('SearchBar -> componentDidMount');
    }

    componentWillReceiveProps():void {
        console.log('SearchBar -> componentWillReceiveProps');
    }

    componentWillUpdate():void {
        console.log('SearchBar -> componentWillUpate');
    }

    componentDidUpdate():void {
        console.log('SearchBar -> componentDidUpdate');
    }

    private handleChange = e => {
        const {handleChangeFilterText} = this.props;
        let newValue = e.target.value;
        handleChangeFilterText(newValue);
    };

    private handleChangeCheck = e => {
        const {handleChangeInStockOnly} = this.props;
        let newValue = e.target.checked;
        handleChangeInStockOnly(newValue);
    };

    render() {
        const { filterText, inStockOnly } = this.props;
        return (
            <form>
                <input type="text" placeholder="search..." value={filterText} onChange={this.handleChange} />
                <p>
                    <input type="checkbox" checked={inStockOnly} onChange={this.handleChangeCheck} />
                    Only show products in stock
                </p>
            </form>
        )
    }
}