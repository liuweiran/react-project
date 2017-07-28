import {INCREASE_ACTION , DECREMENT_ACTION} from "./actions";

export default function counter(state = {count: 10}, action) {
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