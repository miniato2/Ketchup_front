import { request } from "./Api";
import { getNoticelist, getNotice, insertNotice, updateNotice, deleteNotice } from "../modules/NoticeModule";

export function callGetNoticeListAPI({currentPage, title, setTotalItems}) {
    console.log('callNoticeListAPI...');

    return async (dispatch, getState) => {
        try {
            let endpoint = `/notices?page=${currentPage}`;

            if (title) {
                endpoint += `&title=${title.toLowerCase()}`;
            }

            const result = await request('GET', endpoint);
            console.log('Number of notices received:', result);

            // 필독 공지와 일반 공지를 분리하여 변수에 할당
            const fixedNotices = result?.data?.data?.fixedNotices || [];
            const normalNotices = result?.data?.data?.normalNotices?.content || [];
            const totalItems = result?.data?.data?.normalNotices?.totalElements || {};

            console.log(fixedNotices);
            console.log(normalNotices);
            console.log(totalItems);

            console.log("callGetNoticeListAPI [ totalItems : ", totalItems);
            setTotalItems(totalItems); // totalItems를 setTotalItems 함수를 통해 전달

            // 필독 공지와 일반 공지를 합친 배열 생성
            const noticeList = [...fixedNotices, ...normalNotices];

            // 공지 목록에서 각 공지마다 회원 정보를 추가하여 배열을 구성
            const noticesWithMemberNames = await Promise.all(noticeList.map(async (notice) => {
                const memberInfoResult = await request('GET', `/members/${notice.memberNo}`);
                return { ...notice, memberName: memberInfoResult.data.memberName, positionName: memberInfoResult.data.position.positionName };
            }));
            
            console.log("noticesWithMemberNames : ", noticesWithMemberNames);
            dispatch(getNoticelist({ noticesWithMemberNames }));
        } catch (error) {
            console.error('Error fetching notice list:', error);
        }
    };
}

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
            const memberInfoResult = await request('GET', `/members/${noticeResult.data.notice.memberNo}`);
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
            
            console.log('파일 업로드 : ', formData)
            const response = await fetch(requestURL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
                }
            });

            const result = await response.json();

            console.log('[callInsertNoticeAPI] callRegisterAPI RESULT : ', result);
            dispatch(insertNotice(result));

            if (result.status === 200) {
                return result.data;
            } else {
                // 오류 응답을 throw하여 catch 블록으로 이동하도록 합니다.
                throw new Error('Error inserting notice:', result);
            }
        } catch (error) {
            console.error('Error inserting notice:', error);
        }
    };
};

export function callUpdateNoticeAPI( formData, noticeNo, noticeFileNo ) {
    console.log('callUpdateNoticeAPI...');

    const requestURL = `http://localhost:8080/notices/${noticeNo}`;

    return async (dispatch, getState) => {
        try {

            noticeFileNo.forEach(id => formData.append('noticeFileNo', id));

            const response = await fetch(requestURL, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
                }
            });

            
            if (!response.ok) {
                // 응답이 성공적이지 않을 때 처리
                const errorResult = await response.json();
                console.error('[callUpdateNoticeAPI] Error:', errorResult.message);
                throw new Error(errorResult.message || 'Error updating notice');
            }

            const result = await response.json();

            console.log('[callUpdateNoticeAPI] callUpdateNoticeAPI RESULT : ', result);

            if (result.status === 200) {
                dispatch(updateNotice(result.data));
            } else {
                // 권한이 없는 경우 에러 메시지 처리
                console.error('Error updating notice: 권한이 없습니다.');
                // 에러를 throw하여 적절히 처리할 수 있도록 합니다.
                throw new Error('Error updating notice: 권한이 없습니다.');
            }
        } catch (error) {
            console.error('Error inserting notice:', error);
        }
    };
}


export function callDeleteNoticeAPI( noticeNo ) {
    console.log('callDeleteNoticeAPI...');

    return async (dispatch, getState) => {
        try {
            const result = await request('DELETE', `/notices/${noticeNo}`);
            console.log('getNotice result : ', result);

            dispatch(deleteNotice(result.data));
        } catch (error) {
            console.error('Error deleteNotice :', error);
            // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
        }
    }
}