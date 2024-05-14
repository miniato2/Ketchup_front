import { getReceivemail, getSendmail, getMaildetail, postInsertmail, putDeletemail } from "../modules/MailModule";
import { request } from "./Api";

// 받은 메일
export function callGetReceiveMailAPI() {
    console.log("getReceivemail api call...");

    return async (dispatch, getState) => {
        // let resultUrl = '';
        // if(search !== '' || search !== null) {
        //     if(searchValue !== '' || searchValue !== null) {
        //         resultUrl = `/mails?part=receive&search=${searchCondition}&searchvalue=${searchKeyword}`;
        //     }else {
        //         resultUrl = '/mails?part=receive';
        //     }
        // }else {
        //     resultUrl = '/mails?part=receive';
        // }

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
export function callGetMailDetailAPI({ mailNo }) {
    console.log("getMailDetail api call...");

    return async (dispatch, getState) => {
        const result = await request('GET', `/mails/${mailNo}`);
        console.log(result.data);

        dispatch(getMaildetail(result.data));
    };
}

// export function callPostInsertMail({ formData }) {
//     return async (dispatch, getState) => {

//         try {
//             const accessToken = window.localStorage.getItem('accessToken');

//             console.log("💛💛💛💛💛💛💛");
//             console.log("💦💤💥💦💦💦💦💦💦💦");
//             for (var pair of formData.entries()) {
//                 console.log(pair[0]+ ', ' + pair[1]); 
//             }

//             const response = await fetch('/mails', {
//                 method: 'POST',
//                 headers: {
//                     // 'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${accessToken}`
//                 },
//                 body: formData
//             });
//             console.log("💙💙💙💙💙💙💙💙");
//             console.log(response);

//             if (!response.ok) {
//                 throw new Error('Failed to insert mail');
//             }

//             const data = await response.json();
//             console.log("💜💜💜💜💜💜💜💜");
//             console.log(data);
//             console.log("메일이 성공적으로 전송되었습니다.");
//         } catch (error) {
//             console.error("메일 전송 중 오류가 발생했습니다.", error);
//             throw error;
//         }  
//     };
// }

// 메일 작성
export const callPostInsertMailAPI = ({ formData }) => {
    const requestURL = `http://localhost:8080/mails`;
    console.log("🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦");
    console.log(window.localStorage.getItem('accessToken'));

    return async (dispatch, getState) => {
        try {
            const result = await fetch(requestURL, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
                    'Content-Type': 'multipart/form-data',
                    'Accept': '*/*'
                },
                body: formData
            }).then((response) => response.json());
            
            console.log("🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈🏳‍🌈");
            console.log(result);

            dispatch(postInsertmail(result));
        } catch (error) {
            console.error('네트워크 오류:', error);
        }
    };
}

// 메일 삭제
export const callPutDeleteMailAPI = ({ part, mailNo }) => {
    console.log("putDeletemail api call...");

    return async (dispatch, getState) => {
        const result = await request('PUT', `/mails?part=${part}&mailno=${mailNo}`);
        console.log(result.data);

        dispatch(putDeletemail());
    };
}