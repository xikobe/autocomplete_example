import { actionTypes } from './actionTypes';
// ACTIONS
export const serverRenderClock = isServer =>
    dispatch => dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() });

export const startClock = dispatch => setInterval(() => {
    // Dispatch `TICK` every 1 second
    dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() });
}, 1000);

export const incrementCount = () => dispatch => dispatch({ type: actionTypes.INCREMENT });

export const decrementCount = () => dispatch => dispatch({ type: actionTypes.DECREMENT });

export const resetCount = () => dispatch => dispatch({ type: actionTypes.RESET });
