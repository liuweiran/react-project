/**
 * Created by Gene on 16/4/8.
 */

require('./MKTableView.sass');

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import objectAssign = require('object-assign');

import MKTableViewScroll from './MKTableViewScroll';
import { initScrollHeight } from './MKTableViewAction';

interface MKTableViewProps {
    dataSource?: MkTableViewDataSource;
    delegate?: MKTableViewDelegate;
    tableHeaderView?: boolean;
    tableFooterView?: boolean;
    initScrollHeight?: Function;
    scrollContainerHeight?: number;
    scrollContentHeight?: number;
    minPointY?: number;
    maxPointY?: number;
}

class MKTableView extends React.Component<MKTableViewProps, any> {

    private startPointY: number = 0;
    private startTranslateY: number = 0;
    private endTranslateY: number = 0;
    private minPointY: number = 0;
    private maxPointY: number = 0;
    private startTime: number = 0;
    private containerHeight: number = 0;
    private timer: number;
    private dampingForceLevel: number = 3;
    private tableViewStyle: Object = {
        transform: "translate3d(0px, 0px, 0px)"
    };

    public state = {
        scrollTopPercent : 0,
        showScrollBar : false,
        duration: 0
    };

    componentDidMount() {
        const { initScrollHeight, maxPointY, minPointY } = this.props;
        const { mkTableViewContainer, mkTableView } = this.refs;

        let scrollContainerHeight: number = mkTableViewContainer['offsetHeight'];
        let scrollContentHeight: number = mkTableView['offsetHeight'];

        this.containerHeight = scrollContainerHeight;
        this.minPointY = scrollContainerHeight - (scrollContentHeight - minPointY);
        this.maxPointY = maxPointY || this.maxPointY;
        this.endTranslateY = this.maxPointY * -1;

        let translate3d = "translate3d(0px, -"+this.maxPointY+"px, 0px)";

        this.tableViewStyle = objectAssign({}, this.tableViewStyle, {
            transform: translate3d
        });

        initScrollHeight(scrollContainerHeight, scrollContentHeight);
    }

    private renderTableView() {
        const { dataSource, delegate } = this.props;

        let sectionCount: number = 1;
        let cells = [];

        if ( !dataSource ) {
            return ;
        }

        if (dataSource.numberOfSectionsInTableView) {
            sectionCount = dataSource.numberOfSectionsInTableView(this);
        }

        this.renderTableViewSections(dataSource, delegate, sectionCount, cells);

        return cells;
    }

    private renderTableViewSections(dataSource, delegate, sectionCount, cells) {

        for ( let i = 0; i < sectionCount; i++ ) {
            this.renderTableViewSection(dataSource, delegate, cells, i);
        }

    }

    private renderTableViewSection(dataSource, delegate, cells, index) {
        let sectionHeaderView = this.renderTableViewSectionHeaderOrFooter(dataSource, delegate, index, 'Header');

        if (sectionHeaderView) {
            cells.push(sectionHeaderView);
        }

        this.renderTableViewRows(dataSource, delegate, cells, index);

        let sectionFooterView = this.renderTableViewSectionHeaderOrFooter(dataSource, delegate, index, 'Footer');

        if (sectionFooterView) {
            cells.push(sectionFooterView);
        }
    }

    private renderTableViewSectionHeaderOrFooter(dataSource, delegate,  index, type) {
        let view: ReactElement<any>;
        let title: string = '';
        let style: Object;

        if ( delegate && delegate['heightFor' + type + 'InSection'] ) {

            let height = delegate['heightFor' + type + 'InSection'](this, index);

            style = {
                'height': height+'px',
                'lineHeight': height+'px'
            };

            if ( delegate && delegate['viewFor' + type + 'InSection'] ) {
                view = <li style={style} key={type + index}>{delegate['viewFor' + type + 'InSection'](this, index)}</li>
            } else if (dataSource['titleFor' + type + 'InSection']) {
                title = dataSource['titleFor' + type + 'InSection'](this, index);

                view = <li style={style} key={type + index}>{title}</li>
            } else {
                view = <li style={style} key={type + index} />
            }
        }

        return view;
    }

    private renderTableViewRows(dataSource, delegate, cells, section) {

        let rowsCount: number = dataSource.numberOfRowsInSection(this, section);

        for ( let i = 0; i < rowsCount; i++ ) {
            this.renderTableViewRow(dataSource, delegate, cells, section, i);
        }
    }

    private renderTableViewRow(dataSource, delegate, cells, section, row) {
        let height = '80px';
        let style = {};

        if (delegate && delegate.heightForRowAtIndexPath) {
            height = delegate.heightForRowAtIndexPath({section,row}) + 'px';
            style['lineHeight'] = height;
        }

        style['height'] = height;

        cells.push(
            <li className="mk_table_view_cell" style={style} key={section + '' + row}>
                {dataSource.cellForRowAtIndexPath(this, {section, row})}
            </li>
        );
    }

    private startListScroll = (event) => {
        let transform = this.refs['mkTableView']['style'].transform;
        this.startPointY = event.touches[0].clientY;
        this.startTranslateY = transform.split(',')[1].replace('px','') * 1;
        this.startTime = event.timeStamp ;
        this.setState({showScrollBar:true});
    };

    private listScroll = (event) => {
        let currentPointY = event.touches[0].clientY;
        let translateY = currentPointY - this.startPointY + this.endTranslateY;

        if(translateY <= this.maxPointY && translateY > this.minPointY) {
            this.refs['mkTableView']['style']['transitionDuration'] = "0ms";
            this.refs['mkTableView']['style'].transform = "translate3d(0px, " + translateY + "px, 0px)";
            let scrollTop = translateY / this.minPointY;
            this.setState({scrollTopPercent:scrollTop});
        } else if(translateY >= this.maxPointY) {
            translateY = this.maxPointY + (translateY - this.maxPointY) / (this.dampingForceLevel + (translateY / (this.containerHeight * 0.5)));
            this.refs['mkTableView']['style']['transitionDuration'] = "0ms";
            this.refs['mkTableView']['style'].transform = "translate3d(0px, " + translateY + "px, 0px)";

            this.setState({scrollTopPercent:0});
        } else {
            translateY = Math.abs(translateY) + this.minPointY;
            translateY = this.minPointY - translateY / (this.dampingForceLevel + (translateY / (this.containerHeight * 0.5)));
            this.refs['mkTableView']['style']['transitionDuration'] = "0ms";
            this.refs['mkTableView']['style'].transform = "translate3d(0px, " + translateY + "px, 0px)";
            this.setState({scrollTopPercent:1});
        }
    };

    private endListScroll = (event) => {


        let transform = this.refs['mkTableView']['style'].transform;
        this.endTranslateY = transform.split(',')[1].replace('px','') * 1;
        this.setState({showScrollBar:false});

        let duration = event.timeStamp - this.startTime;

        if (this.timer) {
            clearTimeout(this.timer);
        }

        if (this.endTranslateY >= this.maxPointY) {
            this.refs['mkTableView']['style'].transitionTimingFunction = "cubic-bezier(0.1, 0.57, 0.1, 1)";
            this.refs['mkTableView']['style']['transitionDuration'] = "600ms";
            this.refs['mkTableView']['style'].transform = "translate3d(0px, -"+this.maxPointY+"px, 0px)";
            this.endTranslateY = this.maxPointY * -1;
        } else if (this.endTranslateY <= this.minPointY){
            this.refs['mkTableView']['style'].transitionTimingFunction = "cubic-bezier(0.1, 0.57, 0.1, 1)";
            this.refs['mkTableView']['style']['transitionDuration'] = "600ms";
            this.refs['mkTableView']['style'].transform = "translate3d(0px, " + this.minPointY + "px, 0px)";
            this.endTranslateY = this.minPointY;
        } else if(duration < 300) {

            let distance = this.endTranslateY - this.startTranslateY;
            let time = event.timeStamp - this.startTime;
            let speed = Math.abs(distance) / time;
            let deceleration = 0.0006;
            let destination = Math.round(this.endTranslateY + (speed * speed) / (2 * deceleration) * ( distance < 0 ? -1 : 1 ));

            duration = speed / deceleration;

            if (destination < this.minPointY) {
                destination = this.containerHeight ? this.minPointY - ( this.containerHeight / 2.5 * ( speed / 8 ) ) : this.minPointY;
                distance = Math.abs(destination - this.endTranslateY);
                duration = distance / speed;

                this.timer = setTimeout(() => {
                    this.endListScroll(event);
                }, duration);
            } else if ( destination > 0 ) {
                destination = this.containerHeight ? this.containerHeight / 2.5 * ( speed / 8 ) : 0;
                distance = Math.abs(this.endTranslateY) + destination;
                duration = distance / speed;

                this.timer = setTimeout(() => {
                    this.endListScroll(event);
                }, duration);
            }

            this.endTranslateY = destination;

            this.refs['mkTableView']['style'].transitionTimingFunction = "cubic-bezier(0.1, 0.57, 0.1, 1)";
            this.refs['mkTableView']['style']['transitionDuration'] = duration+"ms";
            this.refs['mkTableView']['style'].transform = "translate3d(0px, " + destination + "px, 0px)";

            if (destination > 0) {
                destination = 0;
            } else if (destination < this.minPointY) {
                destination = this.minPointY;
            }
            
            this.setState({
                scrollTopPercent:destination / this.minPointY,
                duration: duration
            });
        }
    };

    render() {

        const { scrollContainerHeight, scrollContentHeight, tableHeaderView, tableFooterView } = this.props;
        
        const { scrollTopPercent, showScrollBar, duration } = this.state;

        this.renderTableView();

        return (
            <div className="mk_table_view_container" ref="mkTableViewContainer">

                <div>
                    <ul className="mk_table_view" style={this.tableViewStyle} ref="mkTableView" onTouchStart={this.startListScroll} onTouchMove={this.listScroll} onTouchEnd={this.endListScroll} >
                        {tableHeaderView && (this.props.children[0] || this.props.children)}
                        {this.renderTableView()}
                        {tableHeaderView && tableFooterView ? this.props.children[1] : tableFooterView && this.props.children}
                    </ul>
                </div>
                <MKTableViewScroll scrollContainerHeight={scrollContainerHeight} scrollContentHeight={scrollContentHeight} scrollTopPercent={scrollTopPercent} showScrollBar={showScrollBar} duration={duration}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        scrollContainerHeight: state.scrollContainerHeight,
        scrollContentHeight: state.scrollContentHeight
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({initScrollHeight}, dispatch);
}

export default connect<any, any, MKTableViewProps>(mapStateToProps, mapDispatchToProps)(MKTableView);