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


export function callGetNoticeAPI({ noticeNo }) {
    console.log('callGetNoticeAPI...');

    return async (dispatch, getState) => {
        try {
            const result = await request('GET', `/notices/${noticeNo}`);
            console.log('getNotice result : ', result);

            dispatch(getNotice(result.data.data.content));
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
            const noticeData = new FormData();

            // 필요한 데이터 추가
            noticeData.append("noticeDTO", JSON.stringify({
                noticeTitle: formData.noticeTitle,
                noticeFix: formData.noticeFix,
                noticeContent: formData.noticeContent
            }));

            // 파일이 있는 경우에만 추가
            if (formData.noticeImgUrl && formData.noticeImgUrl[0]) {
                const file = formData.noticeImgUrl[0];
                noticeData.append("files", file, file.name);
                // 파일의 Content-Type 설정은 별도로 필요 없습니다.
            }

            const result = await request('POST', '/notices', noticeData);
            console.log('insertNotice result : ', result);

            dispatch(insertNotice(result));
        } catch (error) {
            console.error('Error inserting notice:', error);
            // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
        }
    }
}


// export function callInsertNoticeAPI(formData) {
//     console.log('callInsertNoticeAPI...');

//     return async (dispatch, getState) => {
//         try {
//             const noticeData = new FormData();

//             // 필요한 데이터 추가
//             noticeData.append("noticeDTO", JSON.stringify({
//                 noticeTitle: formData.noticeTitle,
//                 noticeFix: formData.noticeFix,
//                 noticeContent: formData.noticeContent
//             }));

//             // 파일이 있는 경우에만 추가
//             if (insertNotice.noticeImgUrl && insertNotice.noticeImgUrl[0]) {
//                 formData.append("files", insertNotice.noticeImgUrl[0], insertNotice.noticeImgUrl[0].name);
//             }

//             const result = await request('POST', '/notices', noticeData);
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