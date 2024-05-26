import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import InsertCommentForm from '../../form/InsertCommentForm';
import { decodeJwt } from '../../../utils/tokenUtils';
import { callDeleteCommentAPI, callGetCommentListAPI } from '../../../apis/CommentAPICalls';
import FormatDate from '../../contents/FormatDate';
import { useNavigate } from 'react-router';

function Comment({ boardNo }) {
    console.log("Comment [ boardNo ] : ", boardNo);
    const dispatch = useDispatch();
    const result = useSelector(state => state.commentReducer);
    const commentList = result.commentlist || [];
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const [loading, setLoading] = useState(true); // 목록 로딩 상태를 관리합니다.
    const [replyTo, setReplyTo] = useState(null); // 답글 대상을 저장하는 state
    const [replyName, setReplyName] = useState(null); // 답글 대상을 저장하는 state
    const [showAllComments, setShowAllComments] = useState(false); // 모든 댓글을 보여줄지 여부를 저장하는 state

    useEffect(() => {
        if (boardNo) {
            dispatch(callGetCommentListAPI({ boardNo }))
                .then(() => {
                    setLoading(false); // 목록 로딩이 완료되면 로딩 상태를 false로 변경합니다.
                })
                .catch((error) => {
                    console.error('Error fetching comment list:', error);
                    setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 변경합니다.
                });
        }
    }, [dispatch, boardNo]);

    const deleteHandler = (commentNo) => {
        dispatch(callDeleteCommentAPI({ boardNo, commentNo }))
            .then(() => {
                // 댓글 삭제 후 바로 목록을 다시 불러옵니다.
                dispatch(callGetCommentListAPI({ boardNo }))
                    .catch((error) => {
                        console.error('Error fetching comment list:', error);
                    });
            })
            .catch((error) => {
                console.error('Error deleting comment:', error);
            });
    };

    const handleReplyClick = (comment) => {
        if (comment.memberName) {
            setReplyName(comment.memberName);
            setReplyTo(comment.memberNo); // 답글 대상을 설정합니다.
        }
    };


    const renderComment = (comment) => {
        const formattedComment = {
            ...comment,
            memberName: `${comment.memberName} ${comment.positionName}`,
            commentCreateDt: FormatDate(comment.commentCreateDt)
        };

        const isDeleted = comment.deleteComment; // 서버에서 받은 삭제 여부 상태를 확인

         // 대댓글 수 계산
        const replyCount = commentList.filter(c => c.parentCommentNo === comment.commentNo).length;

        return (
            <div key={comment.commentNo} style={{ borderTop: '0.5px solid lightgray' }}>
                <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                    <div className='float-left'>
                        <span>{formattedComment.memberName}</span>&nbsp;&nbsp;
                        <span>{formattedComment.commentCreateDt}</span>
                    </div>
                    <div className='float-right'>
                        <button className='text-btn' onClick={() => handleReplyClick(comment)}>답글</button>
                        {loginToken.memberNo === comment.memberNo && ( // 작성자인 경우에만 삭제 버튼 표시
                            <button className='text-btn' onClick={() => deleteHandler(comment.commentNo)}>삭제</button>
                        )}
                    </div>
                    <br />
                    {isDeleted ? (
                        <div style={{ marginTop: "5px", marginBottom: '5px', color: 'red' }}>
                            <span>삭제된 댓글입니다. 7일 후 완전 삭제됩니다.</span>
                        </div>
                    ) : (
                        <div style={{ marginTop: "5px", marginBottom: '5px' }}>

                            {formattedComment.parentMemberNo ? ( // 대댓글인 경우에만 @memberName 표시
                                <span style={{ color: '#EC0B0B' }}>@{formattedComment.parentMemberName} </span>
                            ) : null}
                            <span>{formattedComment.commentContent}</span>
        
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const handleCommentSubmit = () => {
        dispatch(callGetCommentListAPI({ boardNo }))
            .catch(error => {
                console.error('Error fetching comment list:', error);
            });
    };

    const handleToggleComments = () => {
        setShowAllComments(prevState => !prevState);
    };

    const minComments = showAllComments ? commentList : commentList.slice(0, 2);

    return (
        <>
            <div style={{ marginLeft: "10px" }}>
                <i className="bi bi-chat-text"></i>&nbsp;
                <button className="text-btn" style={{ textDecoration: "none" }} onClick={handleToggleComments}>
                    {commentList.length > 2 && (
                        <span>{commentList.length}개의 댓글 {showAllComments ? "접기" : "모두 보기"}</span>

                    )}
                </button>
            </div>

            {loading ? ( // 로딩 중이면 로딩 메시지를 표시합니다.
                <div style={{ marginTop: "5px", marginBottom: '5px' }}>댓글을 불러오는 중입니다...</div>
            ) : (
                minComments && minComments.length > 0 ? (
                    minComments.map(comment => renderComment(comment))
                ) : (
                    <div style={{ marginTop: "5px", marginBottom: '5px' }}>
                        {/* 댓글이 없을 경우 표시할 내용 */}
                    </div>
                )
            )}
            <InsertCommentForm boardNo={boardNo} onCommentSubmit={handleCommentSubmit} replyTo={replyTo} replyName={replyName} />
        </>
    );
}

export default Comment;
