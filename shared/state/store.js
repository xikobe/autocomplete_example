import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import tickReducer from 'shared/state/tick';
import { initialState as tickInitialState } from 'shared/state/tick/reducer';

const initialState = {
    tick: tickInitialState,
};

export const reducer = combineReducers({
    tick: tickReducer,
});

export function initializeStore(state = initialState) {
    return createStore(reducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)));
}
