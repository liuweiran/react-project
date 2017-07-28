export const INCREASE_ACTION = 'INCREASEACTION';
export const DECREMENT_ACTION = 'DECREMENTACTION';

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
