import { request } from "./Api";
import { INSERT_NOTICE, deleteNotice, getNotice, getNoticelist, insertNotice } from "../modules/NoticeModule";
import axios from 'axios';


const API_BASE_URL = 'http://localhost:8080';
const headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: '*/*',
    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
};

export function callGetNoticeListAPI() {
    console.log('callGetNoticeListAPI...');

    return async (dispatch, getState) => {
        try {
            const result = await request('GET', `/notices`); // 수정된 부분
            console.log('getNoticeList result : ', result);

            dispatch(getNoticelist(result.data.data.content));
        } catch (error) {
            console.error('Error fetching notice list:', error);
            // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
        }
    }
}

export function callSearchNoticeListAPI({ title }) {
    console.log('callSearchNoticeListAPI...');

    return async (dispatch, getState) => {
        try {
            const result = await request('GET', `/notices${title ? `?title=${title.toLowerCase()}` : ''}`);
            console.log('searchNoticeList result : ', result);

            dispatch(getNoticelist(result.data.data.content));
        } catch (error) {
            console.error('Error searching notice list:', error);
            // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
        }
    }
}

export function callGetNoticeAPI(noticeNo) {
    console.log('callGetNoticeAPI...');
    console.log('callGetNoticeAPI [ noticeNo ] : ', noticeNo)

    return async (dispatch, getState) => {
        try {
            console.log('callGetNoticeAPI [ noticeNo ] : ', noticeNo)

            const result = await request('GET', `/notices/${noticeNo}`);
            console.log('getNotice result : ', result);

            dispatch(getNotice(result.data));
        } catch (error) {
            console.error('Error notice :', error);
            // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
        }
    }
}


// export const callInsertNoticeAPI = async (formData) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/notices`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
//             }
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error('Error insert: ' + error.message);
//     }
// };
// export const callInsertNoticeAPI = (formData) => {
//     const requestURL = `http://localhost:8080/notices`;

//     formData.append('noticeTitle', formData.noticeTitle);
//     formData.append('memberNo', formData.memberNo);
//     formData.append('noticeFix', formData.noticeFix);
//     formData.append('noticeContent', formData.noticeContent);

//     return async (dispatch, getState) => {
//         const result = await fetch(requestURL, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryABCDEF',
//                 Accept: '*/*',
//                 'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),

//             },
//             body: formData

//         }).then((response) => response.json());

//         console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);

//         if (result.status === 201) {
//             dispatch({ type: INSERT_NOTICE, payload: result });
//         }
//     };
// };

// export const callInsertNoticeAPI = (formData) => {
//     const requestURL = `http://localhost:8080/notices`;

//     const boundary= '----WebKitFormBoundaryABCDEF'
//     // boundary=${boundary}
//     return async (dispatch, getState) => {
//         try {

//             const noticeDTO = {
//                 noticeTitle: formData.get('noticeTitle'),
//                 memberNo: formData.get('memberNo'),
//                 noticeFix: formData.get('noticeFix'),
//                 noticeContent: formData.get('noticeContent'),
//             };

//             formData.delete('noticeTitle');
//             formData.delete('memberNo');
//             formData.delete('noticeFix');
//             formData.delete('noticeContent');

//             formData.append('noticeDTO', JSON.stringify(noticeDTO));

//             const result = await fetch(requestURL, {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'Content-Type': `multipart/form-data; boundary=${boundary}`,
//                     'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
//                 }
//             }).then((response) => response.json());

//             console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);

//             if (result.status === 201) {
//                 dispatch(insertNotice(result));
//             }
//         } catch (error) {
//             console.error('Error inserting notice:', error);
//             // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
//         }
//     };
// };

export const callInsertNoticeAPI = (formData, files) => {
    const requestURL = `http://localhost:8080/notices`;
    // const boundary = '----WebKitFormBoundaryABCDEF';

    return async (dispatch, getState) => {
        try {
            const noticeDTO = {
                noticeTitle: formData.noticeTitle,
                memberNo: formData.memberNo,
                noticeFix: formData.noticeFix,
                noticeContent: formData.noticeContent,
            };

            formData.append('noticeDTO', JSON.stringify(noticeDTO));
            files.forEach(file => formData.append('files', file));

            const result = await fetch(requestURL, {
                method: 'POST',
                body: formData,
                headers: {
                    // 'Content-Type': `multipart/form-data; boundary=${boundary}`,
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
                }
            }).then((response) => response.json());

            console.log('[callInsertNoticeAPI] callRegisterAPI RESULT : ', result);

            if (result.status === 201) {
                dispatch(insertNotice(result));
            }
        } catch (error) {
            console.error('Error inserting notice:', error);
        }
    };
};

// export const callInsertNoticeAPI = (formData) => {
//     const requestURL = `http://localhost:8080/notices`;

//     const boundary= '----WebKitFormBoundaryABCDEF'

//     // formData.append('noticeDTO', JSON.stringify({
//     //     noticeTitle: formData.noticeTitle,
//     //     memberNo: formData.memberNo,
//     //     noticeFix: formData.noticeFix,
//     //     noticeContent: formData.noticeContent,
//     //     files: formData.file
//     // }));

//     return async (dispatch, getState) => {
//         try {

//             const noticeDTO = {
//                 noticeTitle: formData.get('noticeTitle'),
//                 memberNo: formData.get('memberNo'),
//                 noticeFix: formData.get('noticeFix'),
//                 noticeContent: formData.get('noticeContent'),
//             };

//             formData.delete('noticeTitle');
//             formData.delete('memberNo');
//             formData.delete('noticeFix');
//             formData.delete('noticeContent');

//             formData.append('noticeDTO', JSON.stringify(noticeDTO));

//             const result = await fetch(requestURL, {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'Content-Type': `multipart/form-data; boundary=${boundary}`,
//                     'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
//                 }
//             }).then((response) => response.json());

//             console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);

//             if (result.status === 201) {
//                 dispatch(insertNotice(result));
//             }
//         } catch (error) {
//             console.error('Error inserting notice:', error);
//             // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
//         }
//     };
// };

// export function callInsertNoticeAPI(formData) {
//     console.log('callInsertNoticeAPI...');

//     return async (dispatch, getState) => {
//         try {

//             console.log('noticeDTO : ', formData.get('noticeDTO'));
//             console.log('noticeDTO : ', formData.get('files[0]'));

//             // console.log('data : ', data)

//             // 요청 보내기
//             const result = await request('POST', '/notices', formData,  {
//                 headers: {
//                     // 'Content-Type': 'multipart/form-data',
//                     // 'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
//                 }
//             });
//             console.log('insertNotice result : ', result);

//             dispatch(insertNotice(result));

//         } catch (error) {
//             console.error('Error inserting notice:', error);
//             // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
//         }
//     }

// }

export function callDeleteNoticeAPI({ noticeNo }) {
    console.log('callDeleteNoticeAPI...');

    return async (dispatch, getState) => {
        try {
            const result = await request('DELETE', `/notices/${noticeNo}`);
            console.log('getNotice result : ', result);

            dispatch(deleteNotice(result.data.data.content));
        } catch (error) {
            console.error('Error deleteNotice :', error);
            // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
        }
    }
}