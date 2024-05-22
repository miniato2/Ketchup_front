import { getReceivemail, getSendmail, getMaildetail, postInsertmail, putDeletemail, putReadtime, putMailcancel } from "../modules/MailModule";
import { request } from "./Api";

// 받은 메일
export function callGetReceiveMailAPI(searchCondition, searchValue) {
    console.log("getReceivemail api call...");

    return async (dispatch, getState) => {
        let url = '/mails?part=receive';
        if(searchCondition && searchValue) {
            url += `&search=${searchCondition}&searchvalue=${searchValue}`;
        }
        const result = await request('GET', url);
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
export function callGetSendMailAPI(searchCondition, searchValue) {
    console.log("getSendmail api call...");

    return async (dispatch, getState) => {
        let url = '/mails?part=send';
        if(searchCondition && searchValue) {
            url += `&search=${searchCondition}&searchvalue=${searchValue}`;
        }
        const result = await request('GET', url);
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
export function callGetMailDetailAPI(mailNo, part) {
    console.log("getMailDetail api call...");

    return async (dispatch, getState) => {
        const result = await request('GET', `/mails/${mailNo}`);
        console.log(result.data);

        if (part === 'receive') {
            const memberInfoResult = await request('GET', `/members/${result.data.senderMem}`);
            console.log(memberInfoResult);
            const receiveMailDetail = { ...result.data, memberName: memberInfoResult.data.memberName, memberDepName: memberInfoResult.data.position.positionName, memberCompanyEmail: memberInfoResult.data.companyEmail };

            dispatch(getMaildetail(receiveMailDetail));
        } else if (part === 'send') {
            const mail = result.data;
            const memberDetails = await Promise.all(mail.receivers.map(async (receiver) => {
                const memberInfoResult = await request('GET', `/members/${receiver.receiverMem}`);
                const formattedName = `${memberInfoResult.data.memberName} ${memberInfoResult.data.position.positionName}`;
                return formattedName;
            }));
            const formattedMemberNames = memberDetails.join(', ');
            const sendMailDetail = { ...mail, memberName: formattedMemberNames };

            dispatch(getMaildetail(sendMailDetail));
        }
    };
}

// 메일 작성
export const callPostInsertMailAPI = ({ formData }) => {
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
export const callPutDeleteMailAPI = (part, mailNos) => {
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
        console.log("🎭🎭🎭🎭🎭🎭🎭");
        console.log(result.data);

        dispatch(putMailcancel(result.data));
    };
}
