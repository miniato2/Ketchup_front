import { createActions, handleActions } from 'redux-actions';

const initialState = [];

/* action */
export const GET_SCHEDULE = 'schedules/GET_SCHEDULE';
export const POST_SCHEDULE = 'schedules/POST_SCHEDULE';

/* action function */
const actions = createActions({
    [GET_SCHEDULE]: () => { },
    [POST_SCHEDULE]: () => { }
});

/* reducer */
const scheduleReducer = handleActions(
    {
        [GET_SCHEDULE]: (state, { payload }) => {
            return payload;
        },
        [POST_SCHEDULE]: (state, { payload }) => {
            return payload;
        }
    }, initialState
);


export default scheduleReducer;
