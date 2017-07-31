// Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
// Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。

import {INCREASE_ACTION , DECREMENT_ACTION} from "./actions";

export default function counter(state = {count: 10}, action) {  // reducer接受state、action作为参数，返回一个新的state，有了新的state,view才会发生变化
    let count = state.count;

    switch (action.type) {
        case INCREASE_ACTION:
            return {count: count+2};
        case DECREMENT_ACTION:
            return {count: count-2};
        default:
            return state;
    }
}