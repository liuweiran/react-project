/**
 * Created by Gene on 16/4/8.
 */

interface ContentOffset {
    x:number;
    y:number;
}

interface Distance {
    x:number;
    y:number;
}

interface MKTableViewDelegate {
    // 获取表格头部视图高度
    heightForHeaderInTableView?(tableView: ReactElement<any>|any): number;
    // 获取表格底部视图高度
    heightForFooterInTableView?(tableView: ReactElement<any>|any):number;
    // 获取分组内行高
    heightForRowAtIndexPath?(tableView: ReactElement<any>|any, indexPath: IndexPath): number;
    // 获取分组的头部视图高度
    heightForHeaderInSection?(tableView: ReactElement<any>|any, section: number): number;
    // 获取分组的底部视图高度
    heightForFooterInSection?(tableView: ReactElement<any>|any, section: number): number;
    // 获取分组的头部自定义视图
    viewForHeaderInSection?(tableView: ReactElement<any>|any, section: number, settings: Object): ReactElement<any>;
    // 获取分组的底部自定义视图
    viewForFooterInSection?(tableView: ReactElement<any>|any, section: number, settings: Object): ReactElement<any>;
    
    // MKTableView的onTouchStart事件回调
    onTouchStartEvent?(tableView: ReactElement<any>|any, event: Event): void;
    // MKTableView第一次滑动时回调
    onTouchMoveBegin?(tableView: ReactElement<any>|any, distance: Distance): boolean;
    // MKTableView的onTouchMove事件回调
    // onTouchMoveBegin返回false时不执行
    // 返回true继续执行, 返回false阻止滑动事件
    onTouchMoveEvent?(tableView: ReactElement<any>|any, event: Event): void;
    // MKTableView的onTouchEnd事件回调
    onTouchEndEvent?(tableView: ReactElement<any>|any, event: Event): void;
    // MKTableView的allowClickOnTableViewCell为true时,点击表格行回调此代理方法
    onClickEvent?(tableView: ReactElement<any>|any, indexPath: IndexPath, event: Event):void;

    // todo 暂未实现
    willDisplayCellForRowAtIndexPath?(tableView: ReactElement<any>|any, cell: ReactElement<any>, indexPath: IndexPath): void;
    willDisplayHeaderViewForSection?(tableView: ReactElement<any>|any, view: ReactElement<any>, section: number): void;
    willDisplayFooterViewForSection?(tableView: ReactElement<any>|any, view: ReactElement<any>, section: number): void;
    didEndDisplayingCell?(tableView: ReactElement<any>|any, cell: ReactElement<any>, indexPath: IndexPath): void;
    didEndDisplayingHeaderView?(tableView: ReactElement<any>|any, view: ReactElement<any>, section: number): void;
    didEndDisplayingFooterView?(tableView: ReactElement<any>|any, view: ReactElement<any>, section: number): void;
    // todo 应该是UIScrollViewDelegate的方法
    scrollViewDidScroll?(tableView: ReactElement<any>|any, contentOffset: ContentOffset)
    scrollViewWillEndDragging?(tableView: ReactElement<any>|any, contentOffset: ContentOffset)
}