import { getReceivemail, getSendmail, getMaildetail, postInsertmail, putDeletemail, putReadtime, putMailcancel } from "../modules/MailModule";
import { request } from "./Api";

// 받은 메일
export function callGetReceiveMailAPI() {
    console.log("getReceivemail api call...");

    return async (dispatch, getState) => {
        const result = await request('GET', '/mails?part=receive');
        console.log(result.data);

        const sendMailName = await Promise.all(result.data.map(async (mail) => {
            const memberInfoResult = await request('GET', `/members/${mail.senderMem}`);

            let timeString = "";
            if (mail.receivers[0].readTime == null) {
                timeString = "안읽음";
            } else {
                timeString = "읽음";
            }

            return { ...mail, senderName: memberInfoResult.data.memberName, readTime: timeString };
        }));

        dispatch(getReceivemail(sendMailName));
    };
}

// 보낸 메일
export function callGetSendMailAPI() {
    console.log("getSendmail api call...");

    return async (dispatch, getState) => {
        const result = await request('GET', '/mails?part=send');
        console.log(result.data);

        const receiveMailName = await Promise.all(result.data.map(async (mail) => {
            const memberNames = await Promise.all(mail.receivers.map(async (receiver) => {
                const memberInfoResult = await request('GET', `/members/${receiver.receiverMem}`);

                return memberInfoResult.data.memberName;
            }));
            const formattedMemberNames = memberNames.join(', ');
            return { ...mail, receiverName: formattedMemberNames };
        }));

        dispatch(getSendmail(receiveMailName));
    };
}

// 메일 상세
export function callGetMailDetailAPI(mailNo) {
    console.log("getMailDetail api call...");

    return async (dispatch, getState) => {
        const result = await request('GET', `/mails/${mailNo}`);
        console.log(result.data);

        dispatch(getMaildetail(result.data));
    };
}

// 메일 작성
export const callPostInsertMailAPI = ({formData}) => {
    console.log("postInsertmail api call...");

    const requestURL = `http://localhost:8080/mails`;

    return async (dispatch, getState) => {
        try {
            const result = await fetch(requestURL, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')
                },
                body: formData
            }).then((response) => response.json());
            console.log(result.data);

            dispatch(postInsertmail(result.data));
        } catch (error) {
            console.error('네트워크 오류:', error);
        }
    };
}

// 메일 삭제 = 삭제 상태 수정
export const callPutDeleteMailAPI = ( part, mailNos ) => {
    console.log("putDeletemail api call...");

    return async (dispatch, getState) => {
        const mailnoParams = mailNos.map(mailNo => `mailno=${mailNo}`).join('&');
        const result = await request('PUT', `/mails?part=${part}&${mailnoParams}`);
        console.log(result);

        dispatch(putDeletemail(result.data));
    };
}

// 수신자 읽음
export const callPutReadTimeAPI = (mailNo) => {
    console.log("putReadtime api call...");

    const requestURL = `http://localhost:8080/mails/times/${mailNo}`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                'method': 'PUT',
                'headers': {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            });

            const result = await response.json();

            dispatch(putReadtime(result));
        } catch (error) {
            console.error('Error updatetime :', error);
        }
    };
}

// 발송 취소
export function callPutSendMailCancel(mailNo) {
    console.log("putMailcancel api call...");

    return async (dispatch, getState) => {
        const result = await request('PUT', `/mails/${mailNo}`);
        console.log(result.data);

        dispatch(putMailcancel(result.data));
    };
}
