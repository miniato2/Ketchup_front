import { getApprovals, getApproval } from "../modules/ApprovalModule";
import { request } from "./Api";


export const callAppListAPI = ({memberNo, category, status, search, currentPage}) => {
    let requestURL;

    if (currentPage !== undefined || currentPage !== null) {
        requestURL = `/approvals?memberNo=${memberNo}&category=${category}&status=${status}&page=${currentPage}&search=${search}`;
    } else {
        requestURL = `/approvals?memberNo=${memberNo}&category=${category}&status=${status}&search=${search}`;
    }

    return async (dispatch, getState) => {
        const result = await request('GET', requestURL);
        if(result.status == 200){
            dispatch(getApprovals(result.data));
        }
    }
}; //목록

export const callAppAPI = ({approvalNo}) => {
    let requestURL = `/approvals/${approvalNo}`;

    return async (dispatch, getState) => {
        const result = await request('GET', requestURL);
        if(result.status == 200){
            dispatch(getApproval(result.data));
        }
    }
} //상세

export const callInsertAppAPI = ({form}) => {
    let requestURL = `/approvals`;
    console.log(`api 도착`, form);
    return async(dispatch, getState) => {
        const result = await request('POST', requestURL, form);
        console.log('api result' ,result);
        if(result.status == 200){
            console.log('성공')
        }else{
            console.log('실패')
        }
    }
} //등록

export const callGetFormAPI = async(formNo) => {
    let requestURL = `/forms/${formNo}`;
    const result = await request('GET', requestURL);
    return result;
} //양식

export const callGetApprovalCountAPI = async(memberNo) => {
    let requestURL = `/approvals/count?memberNo=${memberNo}`;
    const result = await request('GET', requestURL);
    return result;
} // 문서 개수 조회

export const callUpdateApprovalAPI = (appUpdate) => {
    console.log('api 도착 appUpdate', appUpdate);
    let requestURL = '/approvals';
    return async(dispatch, getState) => {
        // const result = await request('PUT', requestURL, appUpdate);
        // if(result.status == 200){
        //     console.log('성공');
        // }else{
        //     console.log('실패');
        // }
    }
} // 상태 수정