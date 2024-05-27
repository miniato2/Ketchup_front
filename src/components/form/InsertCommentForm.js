// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { decodeJwt } from "../../utils/tokenUtils";
// import { callInsertCommentAPI, callGetCommentListAPI, callInsertReplyAPI } from "../../apis/CommentAPICalls";
// import { useNavigate } from "react-router";

// function InsertCommentForm({ boardNo, onCommentSubmit, replyTo, replyName }) {
//     const dispatch = useDispatch();
//     const [commentContent, setCommentContent] = useState('');
//     const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
//     const memberNo = loginToken.memberNo;

//     useEffect(() => {
//         if (replyName) {
//             setCommentContent(`@${replyName} `);
//         }
//     }, [replyTo]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (commentContent.trim() === '') {
//             alert("댓글을 입력해주세요");
//             return;
//         }

//         try {
//             if (replyName) {
//                 const commentContentToSend = removeReplyTo(commentContent);
//                 const commentDTO = { memberNo, commentContent: commentContentToSend };
//                 await dispatch(callInsertReplyAPI({ boardNo, parentCommentNo: replyTo, commentDTO }));
//             } else {
//                 const commentDTO = { memberNo, commentContent };
//                 await dispatch(callInsertCommentAPI({ boardNo, commentDTO }));
//                 onCommentSubmit();
//             }


//         } catch (error) {
//             console.error('Error inserting comment:', error);
//         }
//         setCommentContent('');
//     }

//     const removeReplyTo = (content) => {
//         // 입력 내용에서 @replyName을 제거하는 함수
//         return content.replace(`@${replyName} `, ''); // @replyName 부분을 제거합니다.
//     }

//     return (
//         <div style={{ marginBottom: "20px" }}>
//             <form onSubmit={handleSubmit}>
//                 <div style={{ marginTop: '20px', marginLeft: "10px", width: "100%" }}>
//                     <input
//                         style={{ height: "35px", width: '92%', border: '1px solid lightgray', borderRadius: '5px', padding: '5px', replyName != null ? color: }}
//                         placeholder={"댓글을 입력해주세요."}
//                         value={commentContent}
//                         onChange={(e) => setCommentContent(e.target.value)}
//                     />
//                     <button type="submit" className="move-btn" style={{ marginLeft: "1%" }}>등록</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default InsertCommentForm;

import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { decodeJwt } from "../../utils/tokenUtils";
import { callInsertCommentAPI, callInsertReplyAPI } from "../../apis/CommentAPICalls";

function InsertCommentForm({ boardNo, onCommentSubmit, replyTo, replyName }) {
    const dispatch = useDispatch();
    const [commentContent, setCommentContent] = useState('');
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const memberNo = loginToken.memberNo;
    const inputRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        if (replyName) {
            setCommentContent(`@${replyName} `);
        } else {
            setCommentContent('');
        }
    }, [replyTo, replyName]);


    const handleInputChange = (e) => {
        setCommentContent(e.target.value);
    };

        useEffect(() => {
        const overlay = overlayRef.current;
        const input = inputRef.current;

        if (overlay && input) {
            if (replyName) {
                const prefixLength = `@${replyName} `.length;
                const textWithoutPrefix = commentContent.slice(prefixLength);
                overlay.innerHTML = `<span style="color: #EC0B0B;">@${replyName} </span>${textWithoutPrefix}`;
            } else {
                overlay.textContent = commentContent;
            }
        }
    }, [commentContent, replyName]);

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
            }
            onCommentSubmit();
        } catch (error) {
            console.error('Error inserting comment:', error);
        }
        setCommentContent('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const removeReplyTo = (content) => {
        return content.replace(`@${replyName} `, '');
    };

    return (
        <div style={{ marginBottom: "20px", position: "relative" }}>
            <form onSubmit={handleSubmit}>
                <div style={{ marginTop: '20px', marginLeft: "10px", width: "100%" }}>
                    <div style={{ position: "relative" }}>
                        <div 
                            ref={overlayRef} 
                            style={{ 
                                position: "absolute", 
                                top: "0", 
                                left: "0", 
                                width: "92%", 
                                height: "35px", 
                                padding: "5px", 
                                pointerEvents: "none", 
                                whiteSpace: "pre-wrap", 
                                overflow: "hidden",
                                color: 'black',
                                zIndex: 1
                            }}
                        ></div>
                        <input
                            ref={inputRef}
                            style={{ 
                                height: "35px", 
                                width: '92%', 
                                border: '1px solid lightgray', 
                                borderRadius: '5px', 
                                padding: '5px', 
                                background: 'transparent', 
                                position: 'relative', 
                                zIndex: 2,
                                color: 'transparent',
                                caretColor: 'black'
                            }}
                            placeholder={"댓글을 입력해주세요."}
                            value={commentContent}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="move-btn" style={{ marginLeft: "1%" }}>등록</button>
                </div>
            </form>
        </div>
    );
};

export default InsertCommentForm;
