import { useDispatch, useSelector } from "react-redux";
import { callDeleteNoticeAPI, callGetNoticeAPI } from "../../../apis/NoticeAPICalls";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../../contents/ButtonGroup";
import FormatDate from "../../contents/FormatDate";
import DOMPurify from "isomorphic-dompurify"
import { decodeJwt } from "../../../utils/tokenUtils";

function getOriginalFileName(filePath) {
    console.log("filePath : ", filePath);
    const parts = filePath.split("\\"); // 역슬래시를 기준으로 분할
    const fileNameWithExtension = parts[parts.length - 1]; // 마지막 부분이 파일명과 확장자가 있는 부분
    const fileNameParts = fileNameWithExtension.split('.'); // 파일명과 확장자를 분할
    fileNameParts.pop(); // 마지막 항목은 확장자이므로 제거
    const fileName = fileNameParts.join('.'); // 파일명으로 조합
    return fileName;
}

function Notice({ noticeNo }) {

    console.log('Notice [ noticeNo ] : ', noticeNo);
    const dispatch = useDispatch();
    const notice = useSelector(state => state.noticeReducer.notice);
    const navigate = useNavigate();


    useEffect(() => {
        console.log('useEffect [ noticeNo ] : ', noticeNo)
        if (noticeNo) {
            dispatch(callGetNoticeAPI(noticeNo));
        }
    }, [dispatch, noticeNo]);



    const updateHandler = () => navigate(`/notices/update/${noticeNo}`);
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

    // notice가 정의되지 않았는지 확인한 후 속성에 액세스합니다.
    if (!notice) {
        return <div>로딩 중...</div>; // 또는 다른 적절한 로딩 표시기를 렌더링합니다.
    };

    const downloadFile = async (filePath, fileName) => {
        try {
            const response = await fetch(filePath); // 파일 경로를 통해 파일 데이터 요청
            const blob = await response.blob(); // 파일 데이터를 Blob 형식으로 변환
            const url = window.URL.createObjectURL(blob); // Blob 데이터를 다운로드할 수 있는 URL로 변환
            const a = document.createElement('a'); // 가상의 <a> 요소 생성
            a.href = url; // <a> 요소의 href 속성에 Blob URL 설정
            a.download = fileName; // 다운로드할 파일의 이름 설정
            document.body.appendChild(a); // <a> 요소를 body에 추가
            a.click(); // 가상의 <a> 요소를 클릭하여 다운로드 시작
            document.body.removeChild(a); // 다운로드가 완료되면 <a> 요소 제거
            window.URL.revokeObjectURL(url); // Blob URL 해제
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

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

    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    console.log("loginToken : ", loginToken)
    return (
        // notice && (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    { /* 로그인 된 상황에만 button이 보이도록 조건부 랜더링 */}
                    {/* { (loginStatus) &&  */}
                    {(loginToken.role === 'LV2' || loginToken.role === 'LV3') && (
                        <ButtonGroup
                            buttons={[
                                { label: '수정', styleClass: 'back', onClick: updateHandler },
                                { label: '삭제', styleClass: 'move', onClick: deleteHandler }
                            ]}
                        />
                    )}
                    {/* } */}
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">

                    <h1>{notice.noticeTitle}</h1>

                    <div style={{ marginBottom: '30px' }}>

                        <img src={`/img/${notice.memberInfo.imgUrl}`} width="30" height="30" />&nbsp;
                        <span className="">{notice.memberInfo.memberName}</span>&nbsp;
                        <span>{notice.memberInfo.position.positionName}</span>&nbsp;&nbsp;
                        <span>{FormatDate(notice.noticeCreateDttm)}</span>
                        {notice.noticeUpdateDttm && (
                            <span> / 수정 시간: {FormatDate(notice.noticeUpdateDttm)}</span>
                        )}
                    </div>

                    <div className="card-body">
                        {notice.noticeFileList && notice.noticeFileList.length > 0 && (
                            <ul>
                                {notice.noticeFileList.map((file, index) => (

                                    <li style={{ listStyle: 'none' }} key={index}>
                                        <i className={`bi ${getIconClass(file.noticeFileName)} me-2`}></i>
                                        <a
                                            style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}
                                            onClick={() => downloadFile(file.noticeFilePath, getOriginalFileName(file.noticeFileName))}
                                        >
                                            {getOriginalFileName(file.noticeFileName)}                                        
                                        </a>
                                    </li>
                                ))}
                            </ul>

                        )}
                        {/* file-earmark-pdf / file-earmark-text / file-earmark-image / file-earmark-zip /  */}
                        {/* <a className="bi-file-earmark-pdf-fill"> [개발자료]가정의달  신제품 개발자료1.pdf </a><br />
                        <a className="bi-file-earmark-pdf-fill"> [개발자료]가정의달  신제품 개발자료2.pdf </a><br />
                        <a className="bi-file-earmark-pdf-fill"> [개발자료]가정의달  신제품 개발자료3.pdf </a> */}
                    </div>

                    <div style={{ marginTop: '30px', marginBottom: '100px' }}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(notice.noticeContent) }}>
                    </div>

                </div>

            </div>
        </div >
    );
}

export default Notice;