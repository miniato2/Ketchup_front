import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */

export const GET_DEPARTMENTS    = 'member/GET_DEPARTMENTS';



const actions = createActions({
   
    [GET_DEPARTMENTS]: () => {},
   
});

/* 리듀서 */
const departmentReducer = handleActions(
    {
       
        [GET_DEPARTMENTS]: (state, { payload }) => {
            
            return payload;
        },
        

    },
    initialState
);

export default departmentReducer;