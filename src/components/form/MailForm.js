import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMembersAPI } from "../../apis/MemberAPICalls";
import ReactQuill from "react-quill";
import { callPostInsertMail } from "../../apis/MailAPICalls";
import { useNavigate } from "react-router-dom";

function MailForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const members = useSelector(state => state.memberReducer);
    const memberList = members.data?.content || [];
    const quillRef = useRef();
    const [mailForm, setMailForm] = useState({
        mailTitle: '',
        mailContent: '',
        receivers: []
    });
    const [mailFile, setMailFile] = useState([]);

    useEffect(
        () => {
            dispatch(callMembersAPI());
        }, [dispatch]
    );

    const onChangeHandler = (e) => {
        console.log(e.target);
        const { name, value } = e.target;

        setMailForm({
            ...mailForm,
            [name]: value
        });
    };

    const onRecipientChange = (e) => {
        const { value } = e.target;
        setMailForm(prevState => ({
            ...prevState,
            receivers: [...prevState.receivers, { receiverMem: value }]
        }));
    };

    // const handleFileChange = (e) => {
    //     const files = e.target.files;
    //     if (files && files.length > 0) {
    //         // 현재 상태에서 mailFiles를 가져옵니다. 없다면 빈 배열을 사용합니다.
    //         const currentFiles = mailFiles.mailFiles || [];
    //         // 현재 상태의 파일과 새로운 파일을 합쳐서 새로운 파일 목록을 생성합니다.
    //         const newFiles = [...currentFiles, ...files];
    //         // 새로운 파일 목록을 mailForm에 설정합니다.
    //         setMailFiles(prevState => ({
    //             ...prevState,
    //             mailFiles: newFiles
    //         }));
    //     }
    // };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setMailFile([...files]); // 파일 목록 업데이트
        }

        console.log("🚆🚆🚆🚆🚆🚆🚆🚆🚆🚆🚆🚆🚆🚆🚆🚆🚆🚆🚆");
        console.log(files);
    };

    const submitMailClick = async () => {
        const formData = new FormData();
        const mailInfo = {
            mailTitle: mailForm.mailTitle,
            mailContent: mailForm.mailContent.ops[0].insert,
            receivers: mailForm.receivers
        };

        if (mailForm.mailContent && mailForm.mailContent.ops && mailForm.mailContent.ops.length > 0) {
            mailInfo.mailContent = mailForm.mailContent.ops[0].insert;
        }

        formData.append('mailInfo', new Blob([JSON.stringify(mailInfo)]));
        mailFile.forEach(file => formData.append('mailFile', file)); // 모든 파일을 FormData에 추가

        console.log("💦💤💥💦💦💦💦💦💦💦");
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        try {
            dispatch(callPostInsertMail({formData}));
            // navigate('/mails/send');
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
                    value={mailForm.mailTitle}
                    id="title"
                    onChange={onChangeHandler}
                    placeholder="제목을 입력하세요" />
            </div>
            <div className="input-container">
                <label>받는 사람</label>
                <select
                    className="form-select"
                    id="recipient"
                    onChange={onRecipientChange}
                    value={mailForm.receivers}>
                    <option selected></option>
                    {memberList.map((item, index) => {
                        return (
                            <option
                                key={index}
                                value={item.memberNo}>
                                {item.memberNo}{item.memberName}({item.department.depName}) {item.companyEmail}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="input-container">
                <label htmlFor="file">첨부파일</label>
                <div className="file-input">
                    <input type="file" className="form-control-file" id="file" name="file" onChange={handleFileChange} multiple />
                </div>
            </div>
            <div>
                <ReactQuill
                    style={{ height: "350px", margin: "4px", overflowY: 'auto' }}
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
            <button type="submit" onClick={submitMailClick} className="move-btn">전송</button>
        </>
    );
}

export default MailForm;