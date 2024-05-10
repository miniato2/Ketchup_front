import { createActions, handleActions } from 'redux-actions';

const initialState = [];

/* action */
export const GET_SCHEDULE = 'schedules/GET_SCHEDULE';
export const POST_SCHEDULE = 'schedules/POST_SCHEDULE';
export const PUT_SCHEDULE = 'schedules/PUT_SCHEDULE';
export const DELETE_SCHEDULE = 'schedules/DELETE_SCHEDULE';

/* action */
const actions = createActions({
    [GET_SCHEDULE]: () => { },
    [POST_SCHEDULE]: () => { },
    [PUT_SCHEDULE]: (skdNo) => ({ skdNo }),
    [DELETE_SCHEDULE]: (skdNo) => ({ skdNo })
});

/* reducer */
const scheduleReducer = handleActions(
    {
        [GET_SCHEDULE]: (state, { payload }) => {
            return payload;
        },
        [POST_SCHEDULE]: (state, { payload }) => {
            return payload;
        },
        [PUT_SCHEDULE]: (state, { payload }) => {
            const updatedSchedule = payload;
            return state.map(schedule =>
                schedule.id === updatedSchedule.id ? updatedSchedule : schedule
            );
        },
        [DELETE_SCHEDULE]: (state, { payload: { skdNo } }) => {
            return state.filter(schedule => schedule.id !== skdNo);
        }
    }, initialState
);

export default scheduleReducer;
