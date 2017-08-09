export default class Repo extends React.Component<any, any> {
    render() {
        const {params} = this.props;
        return (
            <div>
                <h2>{params['repoName']}</h2>
            </div>
        )
    }
}