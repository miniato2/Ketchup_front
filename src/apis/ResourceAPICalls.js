import { deleteResource, getResourcedetail, getResources, postResources, putResource } from "../modules/ResourceModule";
import { request } from "./Api";

export function callGetResourcesAPI(part) {
    console.log("getResources api call...");

    return async (dispatch, getState) => {
        const result = await request('GET', `/resources?part=${part}`);
        console.log(result.data);

        dispatch(getResources(result.data));
    };
}

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
            console.log(result);

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

export function callPutResourceAPI({selectRscNo, updateRscDto}) {
    console.log("putResource api call...");
    console.log("💚💚💚💚💚💚💚💚");
    console.log(selectRscNo);
    console.log(updateRscDto);

    const requestURL = `http://localhost:8080/resources/${selectRscNo}`;

    return async (dispatch, getState) => {
        try {
            const result = await fetch(requestURL, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')
                },
                body: JSON.stringify(updateRscDto)
            }).then(response => response.json());
            console.log(result.data);

            dispatch(putResource(result.data));
        }catch(error) {
            console.log("자원 수정에 실패했습니다.", error);
        }
    };
}

export function callDeleteResourceAPI(selectedItems) {
    console.log("deleteResource api call...");

    return async (dispatch, getState) => {
        let result;
        for(let i = 0; i < selectedItems.length; i++) {
            result = await request('DELETE', `/resources/${selectedItems[i]}`);
        }
        console.log(result.data);

        dispatch(deleteResource(result.data));
    };
}