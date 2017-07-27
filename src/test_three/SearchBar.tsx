export default class SearchBar extends React.Component<any, any> {

    private handleChange = () => {
        const {onUserInput} = this.props;
        onUserInput(
            this.refs['filterTextInput']['value'],
            this.refs['inStockOnlyInput']['checked'],
        );
    };

    render() {
        const { filterText, inStockOnly } = this.props;

        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    ref="filterTextInput"
                    value = {filterText}
                    onChange = {this.handleChange}
                />
                <p>
                    <input
                        type="checkbox"
                        ref="inStockOnlyInput"
                        checked = {inStockOnly}
                        onChange = {this.handleChange}
                    />
                    Only show products in stock
                </p>
            </form>
        )
    }
};