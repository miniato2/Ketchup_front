import { request } from "./Api";
import { deleteNotice, getNotice, getNoticelist, insertNotice } from "../modules/NoticeModule";


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

export const callInsertNoticeAPI = (formData) => {
    const requestURL = `http://localhost:8080/notices`;

    return async (dispatch, getState) => {
        try {
            
            const response = await fetch(requestURL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
                }
            });

            const result = await response.json();

            console.log('[callInsertNoticeAPI] callRegisterAPI RESULT : ', result);

            if (result.status === 201) {
                dispatch(insertNotice(result));
            }
        } catch (error) {
            console.error('Error inserting notice:', error);
        }
    };
};


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