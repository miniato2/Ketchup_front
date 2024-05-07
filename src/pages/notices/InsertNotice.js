import { useState } from "react";
import ButtonGroup from "../../components/contents/ButtonGroup";
import Editor from "../../components/contents/Editor";
import SearchBar from "../../components/contents/SearchBar";
import TitleAndFile from "../../components/contents/TitleAndFile";
import { useNavigate } from "react-router-dom";
import { insertNotice } from "../../modules/NoticeModule";
import { callInsertNoticeAPI } from "../../apis/NoticeAPICalls";

function InsertNotice() {

  /* 로그인 상태 확인 */
  // const loginStatus = !!localStorage.getItem('isLogin');
  // const dispatch = useDispatch();
  // const { id } = useParams();
  // const result = useSelector(state => state.menuReducer);

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState([]);
  const [isFixed, setIsFixed] = useState(false);
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    if (fileList.length > 5) {
      alert("파일은 최대 5개까지 등록할 수 있습니다.");
      return;
    }
    setFiles(fileList);
  };

  const handleFixedChange = () => setIsFixed(!isFixed);

  const handleContentChange = (value) => setContent(value);

  const handleBack = () => {
    navigate(`/notices`);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    files.forEach((file) => formData.append("files", file));
    formData.append("isFixed", isFixed ? "Y" : "N");
    formData.append("content", content);

    try {
      // API 호출
      const response = await callInsertNoticeAPI(formData); // 수정된 부분
      // 리듀서에 액션 디스패치
      insertNotice(response.data);
      alert("공지사항이 등록되었습니다.");
      navigate(`/notices`);
    } catch (error) {
      console.error("Error saving notice:", error);
      alert("공지사항 등록에 실패했습니다.");
    }
  };

  const buttons = [
    { label: '취소', onClick: handleBack, styleClass: 'back' },
    { label: '등록', onClick: handleSubmit, styleClass: 'move' },
  ];

  return (
    <main id="main" class="main">

      <div class="title">
        <h2>공지사항</h2>
        <SearchBar />
      </div>

      <div class="col-lg-12">
        <div class="list">
          <div class="card-title">
            <TitleAndFile handleTitleChange={handleTitleChange} handleFileChange={handleFileChange} />
            <input type="checkbox" id="fix" onChange={handleFixedChange} /> &nbsp;
            <label htmlFor="fix">최상단에 공지로 등록</label>
          </div>
          <div className="editor-container">
            <Editor handleContentChange={handleContentChange} />
          </div>
          <ButtonGroup buttons={buttons} />
        </div>
      </div>
    </main>
  );
};

export default InsertNotice;