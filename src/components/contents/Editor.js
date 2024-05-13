import { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor() {

  const [content, setContent] = useState("");
  const quillRef = useRef(null);

  return (
    <>
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
    </>
  );
}

export default Editor;