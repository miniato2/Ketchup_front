// TitleAndFile 컴포넌트
import { useState } from "react";
import '../../style.css';

const TitleAndFile = ({ onTitleChange, onFileChange }) => { // props로 콜백 함수 받음

    const [title, setTitle] = useState("");

    const handleTitleChange = (e) => { 
        setTitle(e.currentTarget.value); 
        onTitleChange(e.currentTarget.value); // 부모 컴포넌트로 제목 값 전달
    };

    const [files, setFiles] = useState([]);

    const handleFileChange = e => {
        const fileList = Array.from(e.target.files);
        if (fileList.length > 5) {
            alert("파일은 최대 5개까지 등록할 수 있습니다.");
            return;
        }
        setFiles(fileList);
        onFileChange(fileList); // 부모 컴포넌트로 파일 리스트 전달
    };

    return (
        <>
            <div className="input-container">
                <label htmlFor="title">제목</label>
                <input type="text" id="title" placeholder=" 공지 제목을 입력하세요" onChange={handleTitleChange} />
            </div>
            <div className="input-container">
                <label htmlFor="file">첨부파일</label>
                <div className="file-input">
                    <input type="file" id="file" name="file" multiple onChange={handleFileChange} />
                    {files.map((file, index) => (
                        <div key={index} className="file-name">{file.name}</div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default TitleAndFile;
