import { request } from "./Api";
import { getNoticelist, insertNotice } from "../modules/NoticeModule";


export function callGetNoticeListAPI() {
    console.log('callGetNoticeListAPI...');

    return async (dispatch, getState) => {
        try {
            const result = await request('GET', `/notices`); // 수정된 부분
            console.log('getNoticeList result : ', result);

            dispatch(getNoticelist(result));
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

            dispatch(getNoticelist(result));
        } catch (error) {
            console.error('Error searching notice list:', error);
            // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
        }
    }
}

// export function callGetNoticeAPI({ noticeNo }) {
//     console.log('callGetNoticeAPI...');

//     return async (dispatch, getState) => {
//         const result = await request('GET', `/notices/${noticeNo}`);
//         console.log('getNotice result : ', result);

//         dispatch(getNotice(result));
//     }
// }

export function callInsertNoticeAPI({ notice }) {
    console.log('callInsertNoticeAPI...');

    return async (dispatch, getState) => {
        try {
            // const list = await request('GET', `/notices`);
            // const newNoticeNo = parseInt(list[list.length - 1].noticeNo) + 1;
            // notice.noticeNo = newNoticeNo.toString();
            const result = await request('POST', '/notices', notice);
            console.log('insertNotice result : ', result);

            dispatch(insertNotice(result));
        } catch (error) {
            console.error('Error inserting notice:', error);
            // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
        }
    }
}
