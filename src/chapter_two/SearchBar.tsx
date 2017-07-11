/**
 * Created by Gene on 16/3/11.
 */

class SearchBar extends React.Component<any, any> {

    componentWillMount():void {
        console.log("SearchBar->componentWillMount");
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
    }

    componentDidMount():void {
        console.log("SearchBar->componentDidMount");
    }

    private handleChange(event) {
        const {handleChangeFiltext} = this.props;
        let newValue = event.target.value;
        handleChangeFiltext(newValue);
    }

    private handleChangeCheck(e) {
        const {handleChangeInStockOnly} = this.props;
        let newValue = e.target.checked;
        handleChangeInStockOnly(newValue);
    }

    render() {
        const { filterText, inStockOnly } = this.props;
        return (
            <form>
                <input type="text" placeholder="Search..." value={filterText} onChange={this.handleChange}/>
                <p>
                    <input type="checkbox" checked={inStockOnly} onChange={this.handleChangeCheck}/>
                    {' '}
                    Only show products in stock
                </p>
            </form>
        )
    }
}

export default SearchBar;