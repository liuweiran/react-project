/**
 * Created by Gene on 16/4/26.
 */

class MKTableViewCellHeader extends React.Component<any, any> {

    initializeSubviews(): ReactElement<any> {
        return <span>not implements initializeSubviews</span>;
    }

    render() {

        const {style, key, className} = this.props;

        return (
            <li className={className} style={style} key={key}>
                {this.initializeSubviews()}
            </li>
        )
    }
}

export default MKTableViewCellHeader;