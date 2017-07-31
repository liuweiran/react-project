export default class PostsComponent extends React.Component<any, any> {
    render() {
        const { posts } = this.props;
        return (
            <ul>
                {posts.map((post, i) =>
                    <li key={i}>{post.title}</li>
                )}
            </ul>
        )
    }
}