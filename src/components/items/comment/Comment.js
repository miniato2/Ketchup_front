// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect, useState } from 'react';
// import InsertCommentForm from '../../form/InsertCommentForm';
// import { decodeJwt } from '../../../utils/tokenUtils';
// import { callDeleteCommentAPI, callGetCommentListAPI, callGetReplyAPI } from '../../../apis/CommentAPICalls';
// import FormatDate from '../../contents/FormatDate';
// import axios from 'axios';
// import { callGetMemberAPI } from '../../../apis/MemberAPICalls';

// function Comment({ boardNo }) {
//     console.log("Comment [ boardNo ] : ", boardNo);
//     const dispatch = useDispatch();
//     const result = useSelector(state => state.commentReducer);
//     const commentList = result.commentlist || [];
//     const replies = result.reply || [];
//     const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
//     const [loading, setLoading] = useState(true);       // 목록 로딩 상태 관리
//     const [replyTo, setReplyTo] = useState(null);       // 답글 memberNo
//     const [replyName, setReplyName] = useState(null);   // 답글 memberName

//     console.log("commentList : ", commentList);

//     useEffect(() => {
//         if (boardNo) {
//             dispatch(callGetCommentListAPI({ boardNo }))
//                 .then(() => {
//                     setLoading(false);  // 목록 로딩이 완료 시 false
//                 })
//                 .catch((error) => {
//                     console.error('Error fetching comment list:', error);
//                     setLoading(false);
//                 });
//         }
//     }, [dispatch, boardNo]);

//     const deleteHandler = (commentNo) => {
//         dispatch(callDeleteCommentAPI({ boardNo, commentNo }))
//             .then(() => {
//                 // 댓글 삭제 후 바로 목록을 다시 불러옵니다.
//                 dispatch(callGetCommentListAPI({ boardNo }))
//                     .catch((error) => {
//                         console.error('Error fetching comment list:', error);
//                     });
//             })
//             .catch((error) => {
//                 console.error('Error deleting comment:', error);
//             });
//     };

//     const handleReplyClick = (comment) => {
//         // 답글 대상 설정
//         if (comment.memberName) {
//             setReplyName(comment.memberName);
//             setReplyTo(comment.commentNo);
//         }
//     };




//     const renderComment = (comment, indent = 0) => {
//         const parentComment = commentList.find(parent => parent.commentNo === comment.parentCommentNo);
//         const parentMemberName = parentComment ? parentComment.memberName : null;
//         console.log("renderComment [ comment ] : ", comment);
//         console.log("parentComment : ", parentComment);
//         console.log("parentMemberName : ", parentMemberName);

//         console.log("commentList.positionName  : ", commentList.positionName);

//         const fetchCommentAuthorName = async (comment) => {
//             try {
//                 // 대댓글의 작성자 이름 가져오기
//                 const memberNo = comment.memberNo;

//                 console.log("fetchCommentAuthorName [ memberNo ] : ", memberNo);
//                 // 결과를 기다립니다.
//                 const result = await dispatch(callGetMemberAPI({ memberNo }));

//                 console.log("fetchCommentAuthorName [ result ] : ", result);


//                 // 결과가 정상적으로 반환되었는지 확인 후 값을 반환합니다.
//                 if (result) {
//                     console.log("fetchCommentAuthorName [ result ] : ", result);
//                     return result.data.memberName;
//                 } else {
//                     console.log("fetchCommentAuthorName : " , result);
//                     return ''; // 결과가 없거나 원하는 값이 없을 경우 빈 문자열 반환
//                 }
//             } catch (error) {
//                 console.error('Error fetching author name:', error);
//                 return ''; // 실패 시 빈 문자열 반환
//             }
//         };

//         // 댓글인 경우
//         if (!comment.parentCommentNo) {
//             const formattedComment = {
//                 ...comment,
//                 positionName: comment.positionName,
//                 commentCreateDt: FormatDate(comment.commentCreateDt),
//                 parentMemberName: parentMemberName
//             };

//             console.log("formattedComment :", formattedComment);
//             console.log("formattedComment.memberName :", formattedComment.memberName);

//             // 서버에서 받은 삭제 여부 상태를 확인
//             const isDeleted = comment.deleteComment;

//             return (
//                 <div key={comment.commentNo} style={{ borderTop: comment.parentCommentNo ? '1px solid lightgray' : 'none' }}>
//                     <div style={{ marginLeft: "10px", marginRight: "10px" }}>
//                         <div className='float-left'>
//                             <span>{formattedComment.memberName}{formattedComment.positionName}</span>&nbsp;&nbsp;
//                             <span>{formattedComment.commentCreateDt}</span>
//                         </div>
//                         <div className='float-right'>
//                             <button className='text-btn' onClick={() => handleReplyClick(comment)}>답글</button>
//                             {loginToken.memberNo === comment.memberNo && (
//                                 <button className='text-btn' onClick={() => deleteHandler(comment.commentNo)}>삭제</button>
//                             )}
//                         </div>
//                         <br />
//                         {isDeleted ? (
//                             <div style={{ marginTop: "5px", marginBottom: '5px', color: 'red' }}>
//                                 <span>삭제된 댓글입니다. 7일 후 완전 삭제됩니다.</span>
//                             </div>
//                         ) : (
//                             <div style={{ marginTop: "5px", marginBottom: '5px' }}>
//                                 {formattedComment.parentMemberName ? (
//                                     <span style={{ color: '#EC0B0B' }}>@{formattedComment.parentMemberName} </span>
//                                 ) : null}
//                                 <span>{formattedComment.commentContent}</span>
//                             </div>
//                         )}
//                     </div>
//                     {/* 대댓글이 있는 경우에만 렌더링 */}
//                     {comment.replies && comment.replies.length > 0 && (
//                         <div >
//                             {formattedComment.parentMemberName ? (
//                                 <span style={{ color: '#EC0B0B' }}>@{formattedComment.parentMemberName} </span>
//                             ) : null}
//                             {comment.replies.map(reply => renderComment(reply))}
//                         </div>
//                     )}
//                 </div>
//             );
//         } else {
//             // 대댓글인 경우
//             const authorName = fetchCommentAuthorName(comment); // 대댓글 작성자 이름 가져오기

//             // 서버에서 받은 삭제 여부 상태를 확인
//             const isDeleted = comment.deleteComment;

//             return (
//                 <div key={comment.commentNo} style={{ borderTop: comment.parentCommentNo ? '1px solid lightgray' : 'none' }}>
//                     <div style={{ marginLeft: "10px", marginRight: "10px" }}>
//                         <div className='float-left'>
//                             <span>{comment.memberNo}</span>&nbsp;&nbsp;
//                             <span>{FormatDate(comment.commentCreateDt)}</span>
//                         </div>
//                         <div className='float-right'>
//                             <button className='text-btn' onClick={() => handleReplyClick(comment)}>답글</button>
//                             {loginToken.memberNo === comment.memberNo && (
//                                 <button className='text-btn' onClick={() => deleteHandler(comment.commentNo)}>삭제</button>
//                             )}
//                         </div>
//                         <br />
//                         {isDeleted ? (
//                             <div style={{ marginTop: "5px", marginBottom: '5px', color: 'red' }}>
//                                 <span>삭제된 댓글입니다. 7일 후 완전 삭제됩니다.</span>
//                             </div>
//                         ) : (
//                             <div style={{ marginTop: "5px", marginBottom: '5px' }}>
//                                 {parentMemberName ? (
//                                     <span style={{ color: '#EC0B0B' }}>@{parentMemberName} </span>
//                                 ) : null}
//                                 <span>{comment.commentContent}</span>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             );
//         }
//     };

//     const handleCommentSubmit = () => {
//         dispatch(callGetCommentListAPI({ boardNo }))
//             .catch(error => {
//                 console.error('Error fetching comment list:', error);
//             });
//     };

//     return (
//         <>
//             {loading ? ( // 로딩 중이면 로딩 메시지를 표시합니다.
//                 <div style={{ marginTop: "5px", marginBottom: '5px' }}>댓글을 불러오는 중입니다...</div>
//             ) : (
//                 commentList && commentList.length > 0 ? (
//                     commentList.filter(comment => comment.parentCommentNo === null).map(comment => renderComment(comment)) // 부모 댓글만 필터링하여 렌더링
//                 ) : (
//                     <div style={{ marginTop: "5px", marginBottom: '5px' }}>

//                     </div>
//                 )
//             )}
//             <InsertCommentForm boardNo={boardNo} onCommentSubmit={handleCommentSubmit} replyTo={replyTo} replyName={replyName} />
//         </>
//     );
// }

// export default Comment;

import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import InsertCommentForm from '../../form/InsertCommentForm';
import { decodeJwt } from '../../../utils/tokenUtils';
import { callDeleteCommentAPI, callGetCommentListAPI } from '../../../apis/CommentAPICalls';
import FormatDate from '../../contents/FormatDate';
import axios from 'axios';
import { callGetMemberAPI } from '../../../apis/MemberAPICalls';
import { Dialog, Typography } from '@mui/material';
import NormalDeleteModalForm from '../../form/NormalDeleteModalForm';
import { Box } from '@mui/system';
import ButtonGroup from '../../contents/ButtonGroup';

function Comment({ boardNo }) {
    console.log("Comment [ boardNo ] : ", boardNo);
    const dispatch = useDispatch();
    const result = useSelector(state => state.commentReducer);
    const commentList = result.commentlist || [];
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const [loading, setLoading] = useState(true);       // 목록 로딩 상태 관리
    const [replyTo, setReplyTo] = useState(null);       // 답글 memberNo
    const [replyName, setReplyName] = useState(null);   // 답글 memberName
    const [deleteModal, setDeleteModal] = useState(false);  // 삭제 모달 상태
    const [selectedCommentNo, setSelectedCommentNo] = useState(null); // 삭제할 댓글 번호

    console.log("commentList : ", commentList);

    useEffect(() => {
        if (boardNo) {
            dispatch(callGetCommentListAPI({ boardNo }))
                .then(() => {
                    setLoading(false);  // 목록 로딩이 완료 시 false
                })
                .catch((error) => {
                    console.error('Error fetching comment list:', error);
                    setLoading(false);
                });
        }
    }, [dispatch, boardNo]);

    const openDeleteModal = (commentNo) => {
        setSelectedCommentNo(commentNo);
        setDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setSelectedCommentNo(null);
        setDeleteModal(false);
    };

    const deleteHandler = () => {
        if (selectedCommentNo) {
            dispatch(callDeleteCommentAPI({ boardNo, commentNo: selectedCommentNo }))
                .then(() => {
                    // 댓글 삭제 후 바로 목록을 다시 불러옵니다.
                    dispatch(callGetCommentListAPI({ boardNo }))
                        .catch((error) => {
                            console.error('Error fetching comment list:', error);
                        });
                    closeDeleteModal();
                })
                .catch((error) => {
                    console.error('Error deleting comment:', error);
                    closeDeleteModal();
                });
        }
    };

    const handleReplyClick = (comment) => {
        // 답글 대상 설정
        if (comment.memberName) {
            setReplyName(comment.memberName);
            setReplyTo(comment.commentNo);
        }
    };

    const renderComment = (comment) => {
        const parentComment = commentList.find(parent => parent.commentNo === comment.parentCommentNo);
        const parentMemberName = parentComment ? parentComment.memberName : null;
    
        const formattedComment = {
            ...comment,
            positionName: comment.positionName,
            commentCreateDt: FormatDate(comment.commentCreateDt),
            parentMemberName: parentMemberName
        };

        // 서버에서 받은 삭제 여부 상태를 확인
        const isDeleted = comment.deleteComment;

        return (
            <div key={comment.commentNo} style={{ marginLeft: comment.parentCommentNo ? '20px' : '0', borderTop: '1px solid lightgray' }}>
                <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    <div className='float-left'>
                        <span>{formattedComment.memberName} {formattedComment.positionName}{comment.positionName}</span>&nbsp;&nbsp;
                        <span>{formattedComment.commentCreateDt}</span>
                    </div>
                    <div className='float-right'>
                        <button className='text-btn' onClick={() => handleReplyClick(comment)}>답글</button>
                        {loginToken.memberNo === comment.memberNo && (
                            <button className='text-btn' onClick={() => openDeleteModal(comment.commentNo)}>삭제</button>
                        )}
                    </div>
                    <br />
                    {isDeleted ? (
                        <div style={{ marginTop: "5px", marginBottom: '5px', color: 'red' }}>
                            <span>삭제된 댓글입니다. 7일 후 완전 삭제됩니다.</span>
                        </div>
                    ) : (
                        <div style={{ marginTop: "5px", marginBottom: '5px' }}>
                            {formattedComment.parentMemberName ? (
                                <span style={{ color: '#EC0B0B' }}>@{formattedComment.parentMemberName} </span>
                            ) : null}
                            <span>{formattedComment.commentContent}</span>
                        </div>
                    )}
                </div>
                {/* 대댓글이 있는 경우에만 렌더링 */}
                {comment.replies && comment.replies.length > 0 && (
                    <div>
                        {comment.replies.map(reply => renderComment(reply))}
                    </div>
                )}
            </div>
        );
    };

    const handleCommentSubmit = () => {
        dispatch(callGetCommentListAPI({ boardNo }))
            .catch(error => {
                console.error('Error fetching comment list:', error);
            });
    };

    return (
        <>
            {loading ? ( // 로딩 중이면 로딩 메시지를 표시합니다.
                <div style={{ marginTop: "5px", marginBottom: '5px' }}>댓글을 불러오는 중입니다...</div>
            ) : (
                commentList && commentList.length > 0 ? (
                    commentList.filter(comment => comment.parentCommentNo === null).map(comment => renderComment(comment)) // 부모 댓글만 필터링하여 렌더링
                ) : (
                    <div style={{ marginTop: "5px", marginBottom: '5px' }}>
                        댓글이 없습니다.
                    </div>
                )
            )}

            <InsertCommentForm boardNo={boardNo} onCommentSubmit={handleCommentSubmit} replyTo={replyTo} replyName={replyName} />

            <Dialog open={deleteModal} onClose={closeDeleteModal}>
                <Box p={6} justifyContent="flex-end" padding="40px" paddingBottom="20px">
                    <Typography variant="body1">7일 후 완전히 삭제됩니다.</Typography>
                    <br />
                    <ButtonGroup
                        buttons={[
                            { label: '취소', styleClass: 'back', onClick: closeDeleteModal },
                            { label: '삭제', styleClass: 'move', onClick: deleteHandler }
                        ]}
                    />
                </Box >
            </Dialog>
        </>
    );
}

export default Comment;
