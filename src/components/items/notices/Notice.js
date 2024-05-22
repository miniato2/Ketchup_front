import { useDispatch, useSelector } from "react-redux";
import { callDeleteNoticeAPI, callGetNoticeAPI } from "../../../apis/NoticeAPICalls";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../../contents/ButtonGroup";
import FormatDate from "../../contents/FormatDate";
import DOMPurify from "isomorphic-dompurify"
import { decodeJwt } from "../../../utils/tokenUtils";

function Notice({ noticeNo }) {
    console.log('Notice [ noticeNo ] : ', noticeNo);
    const dispatch = useDispatch();
    const notice = useSelector(state => state.noticeReducer.notice);
    const navigate = useNavigate();
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));

    console.log('Notice [ notice ] : ', notice);

    useEffect(() => {
        console.log('useEffect [ noticeNo ] : ', noticeNo)
        if (noticeNo) {
            dispatch(callGetNoticeAPI(noticeNo));
        }
    }, [dispatch, noticeNo]);

    // notice 객체가 정의되지 않은 경우 로딩 중을 표시하거나 다른 작업을 수행할 수 있습니다.
    if (!notice) {
        return <div>로딩 중...</div>;
    }

    const updateHandler = () => {
        console.log("updateHandler loginToken 확인: ", loginToken);
        // 작성자인 경우에만 수정 페이지로 이동
        if (loginToken && loginToken.memberNo === notice.memberInfo.memberNo) {
            navigate(`/notices/update/${noticeNo}`);
        } else {
            alert('권한이 없습니다.');
        }
    };

    const deleteHandler = () => {
        dispatch(callDeleteNoticeAPI(noticeNo))
            .then(() => {
                alert('공지가 삭제되었습니다.');
                navigate(`/notices`);
            })
            .catch((error) => {
                console.error('공지 삭제 중 오류 발생:', error);
                // 에러가 발생했을 때 추가적인 처리를 수행하거나 사용자에게 알림을 표시할 수 있습니다.
            });
    }

    function getIconClass(fileName) {
        const extension = fileName.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf':
                return 'bi-file-earmark-pdf';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return 'bi-file-earmark-image';
            case 'txt':
                return 'bi-file-earmark-text';
            case 'zip':
                return 'bi-file-earmark-zip';
            case 'xls':
            case 'xlsx':
                return 'bi-file-earmark-excel';
            case 'mp3':
            case 'wav':
                return 'bi-file-earmark-music';
            default:
                return 'bi-file-earmark';
        }
    }

    return (
        // notice && (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    {loginToken && loginToken.memberNo === notice.memberInfo.memberNo && (
                        <ButtonGroup
                            buttons={[
                                { label: '수정', styleClass: 'back', onClick: updateHandler },
                                { label: '삭제', styleClass: 'move', onClick: deleteHandler }
                            ]}
                        />
                    )}

                </div>
            </div>
            <div className="row">
                <div className="col-lg-12" style={{ borderBottom: '0.5px solid lightgray' }}>
                    <h1 style={loginToken && loginToken.memberNo !== notice.memberInfo.memberNo ? { marginTop: '30px' } : {}}>{notice.notice.noticeTitle}</h1>
                    <div style={{ marginBottom: '30px' }}>
                        <img src={`/img/${notice.memberInfo.imgUrl}`} width="30" height="30" alt="profile" />&nbsp;
                        <span className="">{notice.memberInfo.memberName}</span>&nbsp;
                        <span>{notice.memberInfo.position.positionName}</span>&nbsp;&nbsp;
                        <span>{FormatDate(notice.notice.noticeCreateDttm)}</span>
                        {notice.notice.noticeUpdateDttm && (
                            <span> / 수정일: {FormatDate(notice.notice.noticeUpdateDttm)}</span>
                        )}
                    </div>

                    <div className="card-body">
                        {Array.isArray(notice.notice.noticeFileList) && notice.notice.noticeFileList.map(
                            (item, index) => (
                                <span
                                    key={index} className={`bi ${getIconClass(item.noticeFileName)} me-2`}>&nbsp;
                                    <a style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}
                                        href={`/img/${item.noticeFilePath}`} download>
                                        {item.noticeFileOriName}
                                    </a>
                                    <br />
                                </span>))}
                    </div>

                    <div style={{ marginTop: '30px', marginBottom: '100px' }}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(notice.notice.noticeContent) }}>
                    </div>
                </div>

                <div style={{ marginTop: "20px" }} >
                    {/* 다음 글 */}
                    {notice.nextNotice && (
                        <div onClick={() => navigate(`/notices/${notice.nextNotice.noticeNo}`)} style={{ cursor: 'pointer' }}>
                            <i className="bi bi-caret-up" />
                            <span>다음글 |  {notice.nextNotice.noticeTitle}</span>
                        </div>
                    )}

                    {!notice.nextNotice && (
                        <div>
                            <i className="bi bi-caret-up" />
                            <span>다음글 |  <span>다음글이 없습니다.</span></span>
                        </div>
                    )}
                    <br />
                    {/* 이전 글 */}
                    {notice.previousNotice && (
                        <div onClick={() => navigate(`/notices/${notice.previousNotice.noticeNo}`)} style={{ cursor: 'pointer' }}>
                            <i className="bi bi-caret-down" />
                            <span>이전글 |  {notice.previousNotice.noticeTitle}</span>
                        </div>
                    )}
                    {!notice.previousNotice && (
                        <div>
                            <i className="bi bi-caret-down" />
                            <span>이전글 |  <span>이전글이 없습니다.</span></span>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export default Notice;