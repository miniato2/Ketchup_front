import { getResources, postResources } from "../modules/ResourceModule";
import { request } from "./Api";

export function callGetResourcesAPI(part) {
    console.log("getResources api call...");

    return async (dispatch, getState) => {
        const result = await request('GET', `/resources?part=${part}`);
        console.log(result.data);

        dispatch(getResources(result.data));
    };
}

export function callPostResourceAPI({rscData}) {
    console.log("insertResource api call...");

    const requestURL = 'http://localhost:8080/resources';

    return async (dispatch, getState) => {
        try {
            const result = await fetch(requestURL, {
                method: 'POST',
                headers: {
                    
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
                body: rscData,
            }).then((response) => response.json());
            console.log(result);

            dispatch(postResources(result));
        }catch(error) {
            console.error('자원 등록에 실패했습니다.', error);
        }
    };
}