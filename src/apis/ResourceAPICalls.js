import { getResourcedetail, getResources, postResources } from "../modules/ResourceModule";
import { request } from "./Api";

export function callGetResourcesAPI(part) {
    console.log("getResources api call...");

    return async (dispatch, getState) => {
        const result = await request('GET', `/resources?part=${part}`);
        console.log(result.data);

        dispatch(getResources(result.data));
    };
}

// 자원 등록 - 아직 미완성
export function callPostResourceAPI({rscDto}) {
    console.log("insertResource api call...");

    const requestURL = 'http://localhost:8080/resources';

    return async (dispatch, getState) => {
        try {
            const result = await fetch(requestURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')
                },
                body: JSON.stringify(rscDto)
            }).then(response => response.json());
            console.log(result.data);

            dispatch(postResources(result.data));
        }catch(error) {
            console.error('자원 등록에 실패했습니다.', error);
        }
    };
}

export function callGetResourceDetailAPI(rscNo) {
    console.log("getResourcedetail api call....");
    console.log(rscNo);

    return async (dispatch, getState) => {
        const result = await request('GET', `/resources/${rscNo}`);
        console.log(result.data);

        dispatch(getResourcedetail(result.data));
    };
}