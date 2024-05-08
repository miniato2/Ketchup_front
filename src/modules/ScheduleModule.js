import { createActions, handleActions } from 'redux-actions';

const initialState = [];

/* action */
/* type */
export const GET_SCHEDULE = 'schedules/GET_SCHEDULE';

/* action function */
const actions = createActions({
    [GET_SCHEDULE]: () => { }
});

/* reducer */
const scheduleReducer = handleActions(
    {
        [GET_SCHEDULE]: (state, { payload }) => {
            return payload;
        }
    }, initialState
);


export default scheduleReducer;
