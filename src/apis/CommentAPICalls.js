import { request } from "./Api";
import { deleteComment, getCommentlist, getReply, insertComment, insertreply } from "../modules/CommentModule";

export function callGetCommentListAPI({ boardNo }) {
    console.log('callGetCommentListAPI...');
    console.log("callGetCommentListAPI [ boardNo ] : ", boardNo);

    return async (dispatch, getState) => {
        try {

            const results = await request('GET', `/boards/${boardNo}/comments`);
            console.log('API response for comments:', results);

            const commentsWithMemberNames = await Promise.all(results.data.map(async (result) => {
                const memberInfoResult = await request('GET', `/members/${result.memberNo}`);

                let parentMemberName = null;
                if (result.parentMemberNo) {
                    const parentMemberInfoResult = await request('GET', `/members/${result.parentMemberNo}`);
                    parentMemberName = parentMemberInfoResult.data.memberName;
                }

                return {
                    ...result
                    , positionName: memberInfoResult.data.position.positionName
                    , parentMemberName: parentMemberName 
                };
            }));

            
            dispatch(getCommentlist(commentsWithMemberNames));
        } catch (error) {
            console.error('Error fetching board list:', error);
        }
    };
};


export const callInsertCommentAPI = ({ boardNo, commentDTO }) => {
    console.log('callInsertCommentAPI...');
    console.log("callInsertCommentAPI [ boardNo ] : ", boardNo);
    console.log("callInsertCommentAPI [ commentDTO ] : ", commentDTO);
    return async (dispatch, getState) => {
        try {

            const result = await request('POST', `/boards/${boardNo}/comments`, commentDTO);
            console.log("result : ", result);
            if (result.status === 200) {
                dispatch(insertComment(result));
            } else {
                throw new Error('에러');
            }
        } catch (error) {
            console.error('Error inserting notice:', error);
        }
    };
};

export const callInsertReplyAPI = ({ boardNo, parentCommentNo, commentDTO }) => {
    console.log('callInsertReplyAPI...');
    console.log("callInsertReplyAPI [ boardNo ] : ", boardNo);
    console.log("callInsertReplyAPI [ parentCommentNo ] : ", parentCommentNo);
    console.log("callInsertReplyAPI [ commentDTO ] : ", commentDTO);
    return async (dispatch, getState) => {
        try {

            const result = await request('POST', `/boards/${boardNo}/comments/${parentCommentNo}/replies`, commentDTO);
            console.log("result : ", result);
            if (result.status === 200) {
                dispatch(insertreply(result));
            } else {
                throw new Error('에러');
            }
        } catch (error) {
            console.error('Error inserting notice:', error);
        }
    };
};


export function callDeleteCommentAPI({ boardNo, commentNo }) {
    console.log('callDeleteBoardAPI...');
    console.log("callInsertCommentAPI [ boardNo ] : ", boardNo);
    console.log("callInsertCommentAPI [ commentNo ] : ", commentNo);

    return async (dispatch, getState) => {
        try {
            const result = await request('DELETE', `/boards/${boardNo}/comments/${commentNo}`);
            console.log('getComment result : ', result);

            dispatch(deleteComment(result.data));
        } catch (error) {
            console.error('Error deleteNotice :', error);
            // 에러가 발생한 경우에 대한 처리를 추가할 수 있습니다.
        }
    }
}

// export function callGetReplyAPI({boardNo, commentNo}) {
//     console.log('callGetReplyAPI...');
//     console.log("callGetReplyAPI [ boardNo ] : ", boardNo);
//     console.log("callGetReplyAPI [ commentNo ] : ", commentNo);

//     return async (dispatch, getState) => {
//         try {

//             const results = await request('GET', `/boards/${boardNo}/comments/${commentNo}/replies`);
            
//             // 각 게시물의 작성자 이름을 가져오기 위해 댓글 목록을 순회
//             const commentsWithMemberNames = await Promise.all(results.data.map(async (result) => {
//                 // 각 게시물의 작성자 memberNo를 이용해 memberName을 조회
//                 const memberInfoResult = await request('GET', `/members/${result.memberNo}`);

//                 // 부모 댓글의 작성자 이름인 parentMemberName을 가져오기 위해 부모 댓글의 memberNo가 있는 경우에만 조회
//                 let parentMemberName = null;
//                 if (result.parentMemberNo) {
//                     const parentMemberInfoResult = await request('GET', `/members/${result.parentMemberNo}`);
//                     parentMemberName = parentMemberInfoResult.data.memberName;
//                 }

//                 // 게시물 목록에 작성자 이름을 추가
//                 return {
//                     ...result
//                     , memberName: memberInfoResult.data.memberName
//                     , positionName: memberInfoResult.data.position.positionName
//                     , parentMemberName: parentMemberName // 부모 댓글의 작성자 이름 추가
//                 };
//             }));

//             // 수정된 게시물 목록을 저장
//             dispatch(getReply(commentsWithMemberNames));
         
//         } catch (error) {
//             console.error('Error inserting notice:', error);
//         }
//     };
// }
