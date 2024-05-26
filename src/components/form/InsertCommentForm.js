// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { decodeJwt } from "../../utils/tokenUtils";
// import { callInsertCommentAPI, callGetCommentListAPI } from "../../apis/CommentAPICalls";
// import { useNavigate } from "react-router";

// function InsertCommentForm({ boardNo, onCommentSubmit, replyTo }) {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [commentContent, setCommentContent] = useState('');
//     const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
//     const memberNo = loginToken.memberNo;

//     useEffect(() => {
//         if (replyTo) {
//             // replyTo 값이 존재하면 해당 값을 입력 필드에 설정합니다.
//             setCommentContent(`@${replyTo} `);
//         }
//     }, [replyTo]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (commentContent.trim() === '') {
//             alert("댓글을 입력해주세요");
//             return; // 댓글 내용이 비어있으면 등록하지 않음
//         }

//         try {
//             const commentDTO = { memberNo, commentContent };
//             await dispatch(callInsertCommentAPI({ boardNo, commentDTO }));

//             // 댓글 등록 후에 새로운 댓글 목록을 불러와서 상태를 업데이트
//             onCommentSubmit();
//         } catch (error) {
//             console.error('Error inserting comment:', error);
//         }
//         // 댓글 입력 필드 초기화
//         setCommentContent('');
//     }

//     return (
//         <div style={{ borderTop: '0.5px solid lightgray', marginBottom: "20px" }}>
//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginTop: '20px', marginLeft: "10px", width: "100%" }}>
//                     <input
//                         style={{ height: "35px", width: '92%' }}
//                         placeholder='답글을 입력해주세요.'
//                         value={commentContent}
//                         onChange={(e) => setCommentContent(e.target.value)}
//                     />
//                     <button type="submit" className="move-btn" style={{ marginLeft: "10px", width: "6%" }}>등록</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default InsertCommentForm;


// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { decodeJwt } from "../../utils/tokenUtils";
// import { callInsertCommentAPI, callGetCommentListAPI, callInsertReplyAPI } from "../../apis/CommentAPICalls"; // callInsertReplyAPI를 import합니다.
// import { useNavigate } from "react-router";

// function InsertCommentForm({ boardNo, onCommentSubmit, replyTo }) { // parentCommentId를 추가합니다.
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [commentContent, setCommentContent] = useState('');
//     const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
//     const memberNo = loginToken.memberNo;

//     useEffect(() => {
//         if (replyTo) {
//             console.log("InsertCommentForm [ replyTo ] : ", replyTo);
//             // replyTo 값이 존재하면 해당 값을 입력 필드에 설정합니다.
//             setCommentContent(`@${replyTo} `);
//         }
//     }, [replyTo]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (commentContent.trim() === '') {
//             alert("댓글을 입력해주세요");
//             return; // 댓글 내용이 비어있으면 등록하지 않음
//         }

//         try {

//             if (replyTo) {
//                 // commentNo 존재하는 경우 대댓글을 등록합니다.
//                 const commentDTO = { memberNo, commentContent };
//                 await dispatch(callInsertReplyAPI({ boardNo, commentNo: replyTo, commentDTO })); 
//             } else {
//                 // commentNo 존재하지 않는 경우 일반 댓글을 등록합니다.
//                 const commentDTO = { memberNo, commentContent: removeReplyTo(commentContent) }; 
//                 await dispatch(callInsertCommentAPI({ boardNo, commentDTO }));
//             }

//             // 댓글 등록 후에 새로운 댓글 목록을 불러와서 상태를 업데이트
//             onCommentSubmit();
//         } catch (error) {
//             console.error('Error inserting comment:', error);
//         }
//         // 댓글 입력 필드 초기화
//         setCommentContent('');
//     }

//     const removeReplyTo = (content) => {
//         // 입력 내용에서 @replyTo를 제거하는 함수
//         return content.replace(`@${replyTo} `, ''); // @replyTo 부분을 제거합니다.
//     }

//     return (
//         <div style={{ borderTop: '0.5px solid lightgray', marginBottom: "20px" }}>
//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginTop: '20px', marginLeft: "10px", width: "100%" }}>
//                     <input
//                         style={{ height: "35px", width: '100%', border: '1px solid lightgray', borderRadius: '5px', padding: '5px' }}
//                         placeholder={"댓글을 입력해주세요."}
//                         value={commentContent}
//                         onChange={(e) => setCommentContent(e.target.value)}
//                     />
//                     <button type="submit" className="move-btn" style={{ marginTop: '10px', width: "100%", backgroundColor: '#EC0B0B', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer' }}>등록</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default InsertCommentForm;

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import { callInsertCommentAPI, callGetCommentListAPI, callInsertReplyAPI } from "../../apis/CommentAPICalls";
import { useNavigate } from "react-router";

function InsertCommentForm({ boardNo, onCommentSubmit, replyTo, replyName }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [commentContent, setCommentContent] = useState('');
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberNo = loginToken.memberNo;

    useEffect(() => {
        if (replyName) {
            setCommentContent(`@${replyName} `);
        }
    }, [replyTo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (commentContent.trim() === '') {
            alert("댓글을 입력해주세요");
            return;
        }

        try {
            if (replyName) {
                const commentContentToSend = removeReplyTo(commentContent);
                const commentDTO = { memberNo, commentContent: commentContentToSend };
                await dispatch(callInsertReplyAPI({ boardNo, parentCommentNo: replyTo, commentDTO }));
            } else {
                const commentDTO = { memberNo, commentContent };
                await dispatch(callInsertCommentAPI({ boardNo, commentDTO }));
                onCommentSubmit();
            }


        } catch (error) {
            console.error('Error inserting comment:', error);
        }
        setCommentContent('');
    }

    const removeReplyTo = (content) => {
        // 입력 내용에서 @replyName을 제거하는 함수
        return content.replace(`@${replyName} `, ''); // @replyName 부분을 제거합니다.
    }

    return (
        <div style={{ borderTop: '0.5px solid lightgray', marginBottom: "20px" }}>
            <form onSubmit={handleSubmit}>
                <div style={{ marginTop: '20px', marginLeft: "10px", width: "100%" }}>
                    <input
                        style={{ height: "35px", width: '100%', border: '1px solid lightgray', borderRadius: '5px', padding: '5px' }}
                        placeholder={"댓글을 입력해주세요."}
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                    />
                    <button type="submit" className="move-btn" style={{ marginTop: '10px', width: "100%", backgroundColor: '#EC0B0B', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer' }}>등록</button>
                </div>
            </form>
        </div>
    );
};

export default InsertCommentForm;