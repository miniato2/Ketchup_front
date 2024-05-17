import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */

export const GET_POSITIONS    = 'member/GET_POSITIONS';



const actions = createActions({
   
    [GET_POSITIONS]: () => {},
   
});

/* 리듀서 */
const positionReducer = handleActions(
    {
       
        [GET_POSITIONS]: (state, { payload }) => {
            
            return payload;
        },
        

    },
    initialState
);

export default positionReducer;