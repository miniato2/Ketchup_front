import { request } from "./Api";
import { getBoardlist, getBoard, insertBoard, updateBoard, deleteBoard } from "../modules/BoardModule";


export function callGetBoardListAPI({ depNo, title, currentPage, setTotalItems  }) {
    console.log('callGetBoardListAPI...');

    return async (dispatch, getState) => {
        try {
            // API 엔드포인트 설정
            let endpoint = `/boards?depNo=${depNo}&page=${currentPage}`;

            if (title) {
                endpoint += `&title=${title}`;
            }

            // // 게시물 목록 요청
            const result = await request('GET', endpoint);
            console.log('Number of boards received:', result.data.data);

            const boardList = result?.data?.data?.content || [];
            const totalItems = result?.data?.data?.totalElements || {};
            
            console.log('Board list:', boardList);
            console.log('Board page:', totalItems);

            setTotalItems(totalItems); // totalItems를 setTotalItems 함수를 통해 전달


            // 각 게시물의 작성자 이름을 가져오기 위해 게시물 목록을 순회
            const boardsWithMemberNames = await Promise.all(boardList.map(async (board) => {
                // 각 게시물의 작성자 memberNo를 이용해 memberName을 조회
                const memberInfoResult = await request('GET', `/members/${board.memberNo}`);
                // 게시물 목록에 작성자 이름을 추가
                return { ...board, memberName: memberInfoResult.data.memberName };
            }));

            // 수정된 게시물 목록을 저장
            dispatch(getBoardlist(boardsWithMemberNames));
        } catch (error) {
            console.error('Error fetching board list:', error);
            // 오류가 발생한 경우에 대한 처리를 추가할 수 있습니다.
        }
    }
}

export function callGetBoardAPI(boardNo) {
    console.log('callGetBoardAPI...');
    console.log('callGetBoardAPI [ boardNo ] : ', boardNo)

    return async (dispatch, getState) => {
        try {
            console.log('callGetBoardAPI [ boardNo ] : ', boardNo)

            // 공지사항 상세 정보 가져오기
            const boardResult = await request('GET', `/boards/${boardNo}`);
            console.log('getBoard result : ', boardResult);

            // 공지 작성자의 정보 가져오기
            const memberInfoResult = await request('GET', `/members/${boardResult.data.memberNo}`);
            console.log('getMemberInfo result : ', memberInfoResult);

            // 공지사항 정보에 작성자의 정보 추가하여 저장
            const boardWithMemberInfo = {
                ...boardResult.data,
                memberInfo: memberInfoResult.data
            };

            console.log('boardWithMemberInfo', boardWithMemberInfo);

            dispatch(getBoard(boardWithMemberInfo));
        } catch (error) {
            console.error('Error fetching notice:', error);
            // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
        }
    }
}


export const callInsertBoardAPI = (formData) => {
    const requestURL = `http://localhost:8080/boards`;

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

            console.log('[callInsertBoardAPI] callRegisterAPI RESULT : ', result);
            dispatch(insertBoard(result));

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

export function callUpdateBoardAPI(formData, boardNo) {
    console.log('callUpdateBoardAPI...');

    const requestURL = `http://localhost:8080/boards/${boardNo}`;

    return async (dispatch, getState) => {
        try {

            const response = await fetch(requestURL, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken'),
                }
            });

            const result = await response.json();

            console.log('[callUpdateBoardAPI] callUpdateBoardAPI RESULT : ', result);

            if (result.status === 200) {
                dispatch(updateBoard(result.data));
            } else {
                // 권한이 없는 경우 에러 메시지 처리
                console.error('Error updating board: 권한이 없습니다.');
                // 에러를 throw하여 적절히 처리할 수 있도록 합니다.
                throw new Error('Error updating board: 권한이 없습니다.');
            }
        } catch (error) {
            console.error('Error inserting board:', error);
        }
    };
}


export function callDeleteBoardAPI(boardNo) {
    console.log('callDeleteNoticeAPI...');

    return async (dispatch, getState) => {
        try {
            const result = await request('DELETE', `/boards/${boardNo}`);
            console.log('getNotice result : ', result);

            dispatch(deleteBoard(result.data));
        } catch (error) {
            console.error('Error deleteNotice :', error);
            // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
        }
    }
}
