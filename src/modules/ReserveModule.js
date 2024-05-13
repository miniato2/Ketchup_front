import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_RESERVE = 'reserves/GET_RESERVE';

const actions = createActions({
    [GET_RESERVE]: () => {  }
});

const reserveReducer = handleActions(
    {
        [GET_RESERVE]: (state, { payload }) => {
            return payload;
        }
    }, initialState
);

export default reserveReducer;