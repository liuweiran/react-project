// State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。
// Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置

export const INCREASE_ACTION = 'INCREASEACTION';
export const DECREMENT_ACTION = 'DECREMENTACTION';

// 定义一个函数来生成 Action，这个函数就叫 Action Creator。
export const increment = () => {
    return {
        type: INCREASE_ACTION
    }
};

export const decrement = () => {
    return {
        type: DECREMENT_ACTION
    }
};