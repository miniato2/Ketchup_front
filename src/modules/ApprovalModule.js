import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
// 초기값
const initialState = {};

// 액션 
const GET_APPROVALS = 'app/GET_APPROVALS';

export const { app: { getApprovals }} = createActions({
    [GET_APPROVALS]: (res) => (res)
});

//리듀서
const approvalReducer = handleActions({
        [GET_APPROVALS]: (state, {payload}) => {return payload}
    }, initialState);

export default approvalReducer;