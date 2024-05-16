import { getResources } from "../modules/ResourceModule";
import { request } from "./Api";

export function callGetResourcesAPI(part) {
    console.log("getResources api call...");

    return async (dispatch, getState) => {
        const result = await request('GET', `/resources?part=${part}`);
        console.log(result.data);

        dispatch(getResources(result.data));
    };
}