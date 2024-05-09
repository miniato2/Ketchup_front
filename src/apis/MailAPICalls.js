import { getReceivemail, getSendmail } from "../modules/MailModule";
import { request } from "./Api";

export function callGetReceiveMailAPI() {
    console.log("getReceivemail api call...");

    return async(dispatch, getState) => {
        const result = await request('GET', '/mails?part=receive');
        console.log(result.data);

        dispatch(getReceivemail(result.data));
    };
}

export function callGetSendMailAPI() {
    console.log("getSendmail api call...");

    return async(dispatch, getState) => {
        const result = await request('GET', '/mails?part=send');
        console.log(result.data);

        dispatch(getSendmail(result.data));
    };
}