import { request } from "./Api";
import { deleteNotice, getNotice, getNoticelist, insertNotice } from "../modules/NoticeModule";

export function callGetNoticeListAPI() {
    console.log('callGetNoticeListAPI...');

    return async (dispatch, getState) => {
        try {
       
            const result = await request('GET', `/notices`);
            console.log('getNoticeList result : ', result);

            // 각 공지의 작성자 이름을 가져오기 위해 공지 목록을 순회합니다.
            const noticesWithMemberNames = await Promise.all(result.data.data.content.map(async (notice) => {
                // 각 공지의 작성자 memberNo를 이용해 memberName을 조회합니다.
                const memberInfoResult = await request('GET', `/members/${notice.memberNo}`);
                // 공지 목록에 작성자 이름을 추가합니다.
                return { ...notice, memberName: memberInfoResult.data.memberName };
            }));

            // 수정된 공지 목록을 저장합니다.
            dispatch(getNoticelist(noticesWithMemberNames));
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

// export function callGetNoticeAPI(noticeNo) {
//     console.log('callGetNoticeAPI...');
//     console.log('callGetNoticeAPI [ noticeNo ] : ', noticeNo)

//     return async (dispatch, getState) => {
//         try {
//             console.log('callGetNoticeAPI [ noticeNo ] : ', noticeNo)

//             const result = await request('GET', `/notices/${noticeNo}`);
//             console.log('getNotice result : ', result);

//             dispatch(getNotice(result.data));
//         } catch (error) {
//             console.error('Error notice :', error);
//             // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
//         }
//     }
// }

export function callGetNoticeAPI(noticeNo) {
    console.log('callGetNoticeAPI...');
    console.log('callGetNoticeAPI [ noticeNo ] : ', noticeNo)

    return async (dispatch, getState) => {
        try {
            console.log('callGetNoticeAPI [ noticeNo ] : ', noticeNo)

            // 공지사항 상세 정보 가져오기
            const noticeResult = await request('GET', `/notices/${noticeNo}`);
            console.log('getNotice result : ', noticeResult);

            // 공지 작성자의 정보 가져오기
            const memberInfoResult = await request('GET', `/members/${noticeResult.data.memberNo}`);
            console.log('getMemberInfo result : ', memberInfoResult);

            // 공지사항 정보에 작성자의 정보 추가하여 저장
            const noticeWithMemberInfo = {
                ...noticeResult.data,
                memberInfo: memberInfoResult.data
            };

            console.log('noticeWithMemberInfo', noticeWithMemberInfo);

            dispatch(getNotice(noticeWithMemberInfo));
        } catch (error) {
            console.error('Error fetching notice:', error);
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