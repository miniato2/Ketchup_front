import { useDispatch, useSelector } from "react-redux";
import { callGetNoticeAPI } from "../../apis/NoticeAPICalls";
import { useEffect } from "react";

function Notice({ noticeNo }) {
    
    const dispatch = useDispatch();
    const result = useSelector(state => state.noticeReducer);
    const notice = result.notice;

    useEffect(() => {
        dispatch(callGetNoticeAPI(noticeNo));
      }, [dispatch, noticeNo]);

    return (
        // notice && (
            <div className="col-12">
            <div className="card recent-sales overflow-auto">
                <div className="card-body">
                <h1>{notice.noticeTitle}</h1>
                    <p>
                        <img src="assets/img/profile-img.png" alt="Profile" className="rounded-circle" />&nbsp;
                        <span className="">{notice.author}</span>&nbsp;
                        <span>{notice.noticeCreateDttm}</span>
                    </p>
                </div> 
                
                <div className="card-body">
                    {/* 개발자료 파일 리스트 출력 */}
                    {notice.files.map((file, index) => (
                        <div key={index}>
                            <img src={file.noticeImgUrl} alt={`File ${index}`} className="file-image" />
                            <br />
                        </div>
                    ))}
                    {/* <a className="bi-file-earmark-pdf-fill"> [개발자료]가정의달  신제품 개발자료1.pdf </a><br />
                    <a className="bi-file-earmark-pdf-fill"> [개발자료]가정의달  신제품 개발자료2.pdf </a><br />
                    <a className="bi-file-earmark-pdf-fill"> [개발자료]가정의달  신제품 개발자료3.pdf </a> */}
                </div>
                
                <div className="card-body">
                    <p>
                        {notice.noticeContent}

                        {/* <span>가정의날 신제품 개발 관련자료 공유드립니다. </span><br />
                        <span>확인 후 업무에 적용해 주세요</span><br />
                        <span>감사합니다. </span> */}
                    </p>
                </div>
            </div>
        </div>
        // )
    );
}

export default Notice;