import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callGetNoticeAPI, callUpdateNoticeAPI } from "../../apis/NoticeAPICalls";
import ButtonGroup from "../../components/contents/ButtonGroup";
import Editor from "../contents/Editor";

function UpdateNoticeForm() {
    const { noticeNo } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [files, setFiles] = useState([]);
    const [fix, setFix] = useState(false);
    const [content, setContent] = useState('');
    const [setFileList] = useState([]);

    const handleFixChange = (e) => {
        const isChecked = e.target.checked;
        setFix(isChecked);
    };

    let memberNo = '';

    const loginToken = window.localStorage.getItem("accessToken");
    memberNo = loginToken.memberNo;

    // 파일 삭제 함수
    const handleDeleteFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('noticeDTO', new Blob([JSON.stringify({ noticeTitle: title, memberNo: memberNo, noticeFix: fix ? 'Y' : 'N', noticeContent: content })], { type: 'application/json' }));
        files.forEach(file => formData.append('files', file)); // 모든 파일을 FormData에 추가

        try {
            await dispatch(callUpdateNoticeAPI(formData, noticeNo));
            navigate(`/notices/${noticeNo}`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeFiles = (e) => {
        const selectedFiles = Array.from(e.target.files);
        console.log('선택된 파일 목록:', selectedFiles);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // 기존 파일 목록과 새로 선택된 파일을 합쳐서 업데이트

        setFileList((prevFileList) => [...prevFileList, ...selectedFiles.map(file => file.name)]);
    };


    const buttons = [
        { label: '취소', onClick: () => navigate(-1), styleClass: 'back' },
        { label: '저장', onClick: handleSubmit, styleClass: 'move' }
    ];

    useEffect(() => {
        // 공지 정보 불러오기
        dispatch(callGetNoticeAPI(noticeNo));
    }, [dispatch, noticeNo]);

    // useSelector를 사용하여 Redux 스토어에서 공지 정보 가져오기
    const notice = useSelector(state => state.noticeReducer.notice);

    useEffect(() => {
        if (notice) {
            setTitle(notice.noticeTitle);
            setContent(notice.noticeContent);
            setFix(notice.noticeFix === 'Y');
            setFiles(notice.noticeFileList || []);
        }
    }, [notice]);

    return (

        <div className="card-title">
            <div className="input-container">
                <label htmlFor="title">제목</label>
                <input type="text" id="title" placeholder=" 공지 제목을 입력하세요" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="input-container">
                <label htmlFor="file">첨부파일</label>
                <div className="file-input">
                    <ul>
                        {files.map((file, index) => (
                            <li style={{ listStyle: 'none' }} key={index}>
                                <span>{file.noticeFileOriName || file.name}</span> &nbsp;
                                {/* 파일 삭제 버튼 */}
                                <button onClick={() => handleDeleteFile(index)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>x</button>
                            </li>
                        ))}
                    </ul>
                    <input type="file" id="formFile" multiple onChange={handleChangeFiles} />
                </div>
            </div>
            <input type="checkbox" id="fix" checked={fix} onChange={handleFixChange} /> &nbsp;
            <label htmlFor="fix">최상단에 공지로 등록</label>
            <div>
                <Editor content={content} setContent={setContent} />
            </div>
            <div className="d-flex justify-content-end mt-4">
                <ButtonGroup buttons={buttons} />
            </div>
        </div>
    );

}

export default UpdateNoticeForm;