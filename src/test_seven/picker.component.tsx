export default class PickerComponent extends React.Component<any, any> {
    render() {
        const { value, onChange, options } = this.props;

        return (
            <div>
                <h1>{value}</h1>
                <select onChange={e => onChange(e.target['value'])} value={value}>
                    {options.map(option =>
                        <option value={option} key={option}>{option}</option>
                    )}
                </select>
            </div>
        )
    }
}