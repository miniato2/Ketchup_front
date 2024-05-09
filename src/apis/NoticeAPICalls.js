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

export function callInsertNoticeAPI(formData) {
    console.log('callInsertNoticeAPI...');

    return async (dispatch, getState) => {
        try {
             // 요청을 보낼 때의 헤더 설정
             const headers = {
                'Content-Type': 'multipart/form-data' // 파일이 포함된 요청을 보낼 때는 multipart/form-data로 설정
            };

             // FormData 생성
             const formDataToSend = new FormData();
             formDataToSend.append('noticeDTO', JSON.stringify(formData)); // formData.noticeTitle 등으로 접근하지 않고, 바로 formData를 사용해야 합니다.

             // 파일이 있는 경우 FormData에 추가
            if (formData.noticeImgUrl && formData.noticeImgUrl[0]) {
                formDataToSend.append("files", formData.noticeImgUrl[0], formData.noticeImgUrl[0].name);
            } else {
                // 파일이 없는 경우에도 FormData에 noticeImgUrl을 추가해야 합니다.
                formDataToSend.append("files", ""); // 파일이 없을 때는 빈 문자열을 추가하거나 다른 기본값을 지정할 수 있습니다.
            }
 
             // 요청 보내기
             const result = await request('POST', '/notices', formDataToSend, headers);
             console.log('insertNotice result : ', result);
             dispatch(insertNotice(result));


        } catch (error) {
            console.error('Error inserting notice:', error);
            // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
        }
    }

}

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