import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMembersAPI } from "../../apis/MemberAPICalls";
import ReactQuill from "react-quill";
import { callPostInsertMailAPI } from "../../apis/MailAPICalls";
import { useNavigate } from "react-router-dom";

function MailForm({ content, mailNo, part }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quillRef = useRef();

    const [mailForm, setMailForm] = useState({
        mailTitle: `RE:${content.mailTitle}`,
        mailContent: '',
        replyMailNo: content.mailNo,
        receivers: [{receiverMem: content.senderMem}]
    });
    const [mailFile, setMailFile] = useState([]);
    // const [receiverInfo, setReceiverInfo] = useState([]);

    // const onChangeHandler = (e) => {
    //     const { name, value } = e.target;

    //     setMailForm({
    //         ...mailForm,
    //         [name]: value
    //     });
    // };

    const handleFileChange = (e) => {
        setMailFile([...e.target.files]);
    };

    const goBackList = () => {
        navigate(`/mails/detail/${mailNo}`, { state: { part } });
    };

    const submitMailClick = async () => {
        const formData = new FormData();

        const mailDto = {
            mailTitle: mailForm.mailTitle,
            mailContent: mailForm.mailContent.ops[0].insert,
            replyMailNo: mailForm.replyMailNo,
            receivers: mailForm.receivers
        };

        if (mailForm.mailContent && mailForm.mailContent.ops && mailForm.mailContent.ops.length > 0) {
            mailDto.mailContent = mailForm.mailContent.ops[0].insert;
        }

        formData.append('mailDto', new Blob([JSON.stringify(mailDto)], { type: 'application/json' }));
        mailFile.forEach(file => formData.append('mailFile', file));

        try {
            await dispatch(callPostInsertMailAPI({ formData }));
            navigate(`/mails/send`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="input-container">
                <label htmlFor="title">제목</label>
                <input
                    type="text"
                    className="form-control"
                    name="mailTitle"
                    id="title"
                    placeholder={`RE:${content.mailTitle}`}
                    readOnly />
            </div>
            <div className="input-container d-flex">
                <label>받는 사람</label>
                <div className="mt-3 d-inline selected-recipient">
                    <span>{`${content.memberName}(${content.memberDepName}) ${content.memberCompanyEmail}`}</span>
                </div>
            </div>
            <div className="input-container">
                <label htmlFor="mailFile">첨부파일</label>
                <div className="file-input">
                    <input type="file" id="mailFile" multiple onChange={handleFileChange} />
                </div>
            </div>
            <div>
                <ReactQuill
                    style={{ height: "400px", overflowY: 'scroll' }}
                    ref={quillRef}
                    value={mailForm.mailContent}
                    theme="snow"
                    onChange={(content, delta, source, editor) => {
                        const value = editor.getContents();
                        setMailForm({
                            ...mailForm,
                            mailContent: value
                        });
                    }}
                    placeholder="내용을 입력하세요."
                />
            </div>
            <div className="d-flex justify-content-end mt-4">
                <button className="back-btn" onClick={goBackList}>취소</button>
                <button type="submit" onClick={submitMailClick} className="move-btn">전송</button>
            </div>
        </>
    );
}

export default MailForm;