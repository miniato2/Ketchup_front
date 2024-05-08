import { useDispatch, useSelector } from "react-redux";
import { callGetNoticeAPI } from "../../apis/NoticeAPICalls";
import { useEffect } from "react";

function Notice({ noticeNo }) {
    
    const dispatch = useDispatch();
    const notice = useSelector(state => state.noticeReducer.notice);

    useEffect(() => {
        dispatch(callGetNoticeAPI(noticeNo));
      }, [dispatch, noticeNo]);


      // notice가 정의되지 않았는지 확인한 후 속성에 액세스합니다.
    if (!notice) {
        return <div>로딩 중...</div>; // 또는 다른 적절한 로딩 표시기를 렌더링합니다.
    }

    const downloadFile = (file) => {
        const binary = atob(file.fileContent);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'multipart/form-data' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        // notice && (
            <div className="col-12">
            <div className="card recent-sales overflow-auto">
                <div className="card-body">
                <h1>{notice?.noticeTitle}</h1>
                    <p>
                        <img src="assets/img/profile-img.png" alt="Profile" className="rounded-circle" />&nbsp;
                        <span className="">{notice?.author}</span>&nbsp;
                        <span>{notice?.noticeCreateDttm}</span>
                    </p>
                </div> 
                
                <div className="card-body">
                    {notice.files.map((file, index) => (
                        <div key={index}>
                            <img src={file.noticeImgUrl} alt={`File ${index}`} className="file-image" />
                            <br />
                            <button onClick={() => downloadFile(file.fileName, file.fileContent)}>다운로드</button>
                        </div>
                    ))}
                    {/* <a className="bi-file-earmark-pdf-fill"> [개발자료]가정의달  신제품 개발자료1.pdf </a><br />
                    <a className="bi-file-earmark-pdf-fill"> [개발자료]가정의달  신제품 개발자료2.pdf </a><br />
                    <a className="bi-file-earmark-pdf-fill"> [개발자료]가정의달  신제품 개발자료3.pdf </a> */}
                </div>
                
                <div className="card-body">
                    <p>
                        {notice?.noticeContent}

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