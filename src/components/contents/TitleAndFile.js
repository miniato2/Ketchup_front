import { useState } from "react";
import '../../style.css';

const TitleAndFile = () => {

    const [files, setFiles] = useState([]);

    const handleFileChange = e => {
        const fileList = Array.from(e.target.files);
        if (fileList.length > 5) {
            alert("파일은 최대 5개까지 등록할 수 있습니다.");
            return;
        }
        setFiles(fileList);
    };


    return (
        <>

            <div class="input-container">
                <label htmlFor="title">제목</label>
                <input type="text" id="title" placeholder=" 공지 제목을 입력하세요" />
            </div>
            <div class="input-container">
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