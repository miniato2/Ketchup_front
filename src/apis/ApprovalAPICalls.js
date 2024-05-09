import { getApprovals, getApproval } from "../modules/ApprovalModule";
import { request } from "./Api";


export const callAppListAPI = ({memberNo, category, status, search, currentPage}) => {
    let requestURL;

    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `/approvals?memberNo=${memberNo}&category=${category}&status=${status}&offset=${currentPage}&search=${search}`;
    } else {
        requestURL = `/approvals?memberNo=${memberNo}&category=${category}&status=${status}&search=${search}`;
    }

    return async (dispatch, getState) => {
        const result = await request('GET', requestURL);
        if(result.status == 200){
            dispatch(getApprovals(result.data));
        }
    }
};

export const callAppAPI = ({approvalNo}) => {
    let requestURL = `/approvals/${approvalNo}`;
    console.log('api 도착');

    return async (dispatch, getState) => {
        const result = await request('GET', requestURL);
        console.log('api', result);
        if(result.status == 200){
            dispatch(getApproval(result.data));
        }
    }
}