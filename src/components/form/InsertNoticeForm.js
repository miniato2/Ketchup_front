// InsertNoticeForm 컴포넌트
import { useDispatch } from "react-redux";
import ButtonGroup from "../../components/contents/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { callInsertNoticeAPI } from "../../apis/NoticeAPICalls";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import ReactMarkdown from 'react-markdown';


function InsertNoticeForm() {

    // const result = useSelector(state => state.noticeReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [files, setFiles] = useState([]);
    const [fix, setFix] = useState(false);
    const [content, setContent] = useState('');
    const quillRef = useRef();
    const [previewContent, setPreviewContent] = useState('');


    let memberNo = '';

    const loginToken = window.localStorage.getItem("accessToken");
    memberNo = loginToken.memberNo;


    const handleFixChange = (e) => {
        const isChecked = e.target.checked;
        setFix(isChecked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('noticeDTO', new Blob([JSON.stringify({ noticeTitle: title, memberNo: memberNo, noticeFix: fix ? 'Y' : 'N', noticeContent: content })], { type: 'application/json' }));
        files.forEach(file => formData.append('files', file)); // 모든 파일을 FormData에 추가

        try {
            console.log("handleSubmit [ result ] : ", formData);
            const noticeNo = await dispatch(callInsertNoticeAPI(formData));
            console.log("dispatch 후 noticeNo : ", noticeNo);
            if (noticeNo) {
                console.log('handleSubmit [ noticeNo ] : ', noticeNo);
                // 등록 성공 시 공지 상세 페이지로 이동
                navigate(`/notices/${noticeNo}`);
            } else {
                console.error("Invalid result:", "실패");
            }
            // console.log("handleSubmit [ result ] : ", formData);
            // const noticeNo  = await dispatch(callInsertNoticeAPI(formData));
            // console.log("dispatch 후 noticeNo : ", noticeNo);
            // if (noticeNo) {
            //     // const noticeNo = result.data; // 반환된 데이터에서 noticeNo 추출
            //     console.log('handleSubmit [ noticeNo ] : ',  noticeNo)
            //     // 등록 성공 시 공지 상세 페이지로 이동
            //     navigate(`/notices/${noticeNo}`);
            // } else {
            //     console.error("Invalid result:", "실패");
            // }
        } catch (error) {
            console.error(error);
            // 등록 실패 시 처리
        }
    };

    const handleChangeFiles = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // 기존 파일 목록과 새로 선택된 파일을 합쳐서 업데이트
    };


    const handleDeleteFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };


    const buttons = [
        { label: '취소', onClick: () => navigate(-1), styleClass: 'back' },
        { label: '등록', onClick: handleSubmit, styleClass: 'move' }
    ];

    useEffect(() => {
        const plainTextContent = content.replace(/(<([^>]+)>)/gi, "");
        const markdownContent = `# \n${plainTextContent}`;
        remark()
            .use(remarkHtml)
            .process(markdownContent, (err, file) => {
                if (err) {
                    console.error("Markdown processing error:", err);
                    return;
                }
                setPreviewContent(String(file));
            });
    }, [content, title]);



    return (
        <main id="main" className="main">
            <div className="title">
                <h2>공지사항</h2>
            </div>

            <div className="col-lg-12">
                <div className="list">
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
                                            <span>{file.name}</span> &nbsp;
                                            <button onClick={() => handleDeleteFile(index)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>x</button>
                                        </li>
                                    ))}
                                </ul>
                                <input type="file" id="formFile" multiple onChange={handleChangeFiles} />
                            </div>
                        </div>
                        <input type="checkbox" id="fix" checked={fix} onChange={handleFixChange} /> &nbsp;
                        <label htmlFor="fix">최상단에 공지로 등록</label>
                    </div>
                    <div className="editor-container">
                        <ReactQuill
                            style={{ height: "300px", margin1: "4px", overflowY: 'auto' }}
                            ref={quillRef}
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            placeholder="내용을 입력하세요."
                            modules={{
                                toolbar: [
                                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                    // [{ 'font': [] }],
                                    [{ 'align': [] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    [{ 'color': [] }, { 'background': [] }],
                                    ['link'],
                                    ['image', 'video'],
                                    ['clean']
                                ]
                            }}
                        />
                        <ReactMarkdown>{previewContent}</ReactMarkdown>
                    </div>
                    <ButtonGroup buttons={buttons} />
                </div>
            </div>
        </main>
    );
};

export default InsertNoticeForm;
