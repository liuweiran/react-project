import { connect } from 'react-redux'
import { selectSubreddit, fetchPostsIfNeeded, invalidateSubreddit } from './actions'

import PickerComponent from './picker.component';
import PostsComponent from './posts.component';


class AsyncApp extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefrechClick = this.handleRefrechClick.bind(this);
    }

    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props;
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }

    componentWillReceiveProps(nextProps) {
        const { selectedSubreddit } = this.props;
        if (nextProps.selectedSubreddit !== selectedSubreddit) {
            const { dispatch, selectedSubreddit } = nextProps;
            dispatch(fetchPostsIfNeeded(selectedSubreddit))
        }
    }

    private handleChange = (nextSubreddit) => {
        const { dispatch } = this.props;
        dispatch(selectSubreddit(nextSubreddit));
    };

    private handleRefrechClick = (e) => {
        e.preventDefault();
        const { dispatch, selectedSubredit } = this.props;
        dispatch(invalidateSubreddit(selectSubreddit));
        dispatch(fetchPostsIfNeeded(selectSubreddit));
    };

    render() {
        const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;

        return (
            <div>
                <PickerComponent
                    value={selectedSubreddit}
                    onChange={this.handleChange}
                    options={['react.js', 'frontend']}
                />
                <p>
                    {lastUpdated &&
                    <span>Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}</span>
                    }
                    {!isFetching &&
                    <a onClick={this.handleRefrechClick}>Refresh</a>
                    }
                </p>
                {isFetching && posts.length === 0 &&
                    <h2>Loading...</h2>
                }
                {!isFetching && posts.length === 0 &&
                    <h2>Empty...</h2>
                }
                {posts.length > 0 &&
                    <div style={{ opacity: isFetching ? 0.5 : 1}}>
                        <PostsComponent posts={posts} />
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { selectedSubreddit, postsBySubreddit } =  state;
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        lastUpdated : '',
        items: []
    };

    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncApp);