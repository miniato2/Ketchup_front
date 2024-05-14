import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import ReactMarkdown from 'react-markdown';

function Editor({content, setContent}) {

  const quillRef = useRef(null);
  const [previewContent, setPreviewContent] = useState('');

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
  }, [content]);

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
      <ReactMarkdown>{previewContent}</ReactMarkdown>

    </>
  );
}

export default Editor;