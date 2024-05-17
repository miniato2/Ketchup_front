import { GET_MEMBER, GET_MEMBERS, POST_LOGIN, POST_REGISTER} from '../modules/MemberModule';
import { GET_DEPARTMENTS } from '../modules/DepartmentModule';
import { GET_POSITIONS } from '../modules/PositionModule';
import { request,multipartRequest } from './Api';


export const callGetMemberAPI = ({ memberNo }) => {
    const requestURL = `http://localhost:8080/members/${memberNo}`;

    return async (dispatch, getState) => {
        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then((response) => response.json());

        console.log('[MemberAPICalls] callGetMemberAPI RESULT : ', result);

        dispatch({ type: GET_MEMBER, payload: result });
    };
};

export const callLoginAPI = ({ form }) => {
    const requestURL = `http://localhost:8080/login`;
    console.log("========로그인 api 호출========");

    return async (dispatch, getState) => {
        // 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능
        // 보안상의 이유로 브라우저는 스크립트에서 시작한 교차 출처 HTTP요청을 제한한다.
        // 서버에서 cors 허용을 해주어야 함
        const result = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': '*', // 모든 도멘인에서 접근할 수 있음을 의미 (특정도메인을 넣고싶으면 * 대신 http://test.com)
            },
            body: JSON.stringify({
                memberNo: form.memberNo,
                memberPW: form.memberPW,
            }),
        }).then((response) => response.json());

        console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
        if (result.status === 200) {
            window.localStorage.setItem('accessToken', result.token);

            dispatch({ type: POST_LOGIN, payload: result });
        }
    };
};


export const callLogoutAPI = () => {
    return async (dispatch, getState) => {

        dispatch({ type: POST_LOGIN, payload: '' });
        console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');


    };
};

export const callRegisterAPI = ({ form }) => {
   
    console.log('여기가 api 시작', form);
    const formData = new FormData();

    // 멤버 정보를 JSON 형식으로 변환하여 FormData에 추가
    const memberInfoBlob = new Blob([JSON.stringify({
        memberNo: form.memberNo,
        memberName: form.memberName,
        memberPW: form.memberPW,
        phone: form.phone,
        birthDate: form.birthDate,
        gender: form.gender,
        address: form.address,
        privateEmail: form.privateEmail,
        companyEmail: form.companyEmail,
        department: form.department,
        position: form.position,
        account: form.account,
        status: form.status,
        imgUrl: form.imgUrl,
    })], { type: 'application/json' });
    formData.append('memberInfo', memberInfoBlob);
    
    // 이미지 파일을 Blob으로 추가
   
    formData.append('memberImage', form.memberImage);
    console.log('----------------여기가 API 실행중', form.memberImage);
   
  
    return async (dispatch) => {
        try {
            const result = await multipartRequest('POST','/signup', formData);
            console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);

            if (result.status === 201) {
                dispatch({ type: POST_REGISTER, payload: result });
            }
        } catch (error) {
            console.error('프론트에서 캐치한 Error: ', error);
        }
    };
};

export function callMembersAPI() {
    console.log("=============전체 사원 호출=============");

    return async (dispatch, getState) => {
        const result = await request('GET', '/noPageMembers');
        console.log("전체 사원 호출 API 결과:   ", result.data);

        dispatch({ type: GET_MEMBERS, payload: result.data });
    };
}

export function callPageMembersAPI(currentPage) {
    console.log("=============전체 사원 호출=============");

    return async (dispatch, getState) => {
        const result = await request('GET', `/members?offset=${currentPage}`);
        console.log("전체 사원 호출 API 결과:   ", result.data);

        dispatch({ type: GET_MEMBERS, payload: result.data });
    };
}


export function callResignMemberAPI(memberNo,statusData) {
    console.log("=============사원 퇴사 진행=============");

    return async (dispatch, getState) => {
        const result = await request('PUT', `/auth/resign/${memberNo}`,statusData);
        console.log(`${memberNo}번 사원 퇴사 결과 `, result);
        console.log(`${memberNo}번 사원 퇴사 결과.데이터 `, result.data);

        dispatch({ type: GET_MEMBER, payload: result });
    };
}



export function callDepartmentsAPI() {
    console.log("=============전체 부서 호출=============");

    return async (dispatch, getState) => {
      
        const result = await request('GET', '/noPageDeps');
        console.log("전체 부서 호출 API 결과:   ", result.data);

        dispatch({ type: GET_DEPARTMENTS, payload: result.data});
    };
}

export function callPositionsAPI() {
    console.log("============전체 직급 호출==============");

    return async (dispatch,getState) => {
        const result = await request('GET','/noPagePositions');
        console.log("전체 직급 호출 API 결과:  ", result.data);

        dispatch({type: GET_POSITIONS, payload: result.data})

    };



}


