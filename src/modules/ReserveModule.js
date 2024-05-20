import { createActions, handleActions } from 'redux-actions';

const initialState = [];

export const GET_RESERVE = 'reserves/GET_RESERVE';
export const POST_RESERVE = 'reserves/POST_RESERVE';

const actions = createActions({
    [GET_RESERVE]: () => {  },
    [POST_RESERVE]: () => {  }
});

const reserveReducer = handleActions(
    {
        [GET_RESERVE]: (state, { payload }) => {
            return payload;
        },
        [POST_RESERVE]: (state, { payload }) => {
            return payload;
        }
    }, initialState
);

export default reserveReducer;