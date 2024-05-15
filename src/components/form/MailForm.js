import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMembersAPI } from "../../apis/MemberAPICalls";
import ReactQuill from "react-quill";
import { callPostInsertMailAPI } from "../../apis/MailAPICalls";
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
    const [receiverInfo, setReceiverInfo] = useState([]);

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

    // 수신자 추가
    const addReceiver = (e) => {
        const { value } = e.target;
        const selectedOption = e.target.options[e.target.selectedIndex];
        const receiverInfo = {
            receiverMem: selectedOption.text
        };

        setMailForm(prevState => ({
            ...prevState,
            receivers: [...prevState.receivers, { receiverMem: value }]
        }));

        setReceiverInfo(prevState => [...prevState, receiverInfo]);
    };

    // 수신자 제거
    const removeReceiver = (delIndex) => {
        setMailForm(prevState => ({
            ...prevState,
            receivers: prevState.receivers.filter((_, index) => index !== delIndex)
        }));
    
        setReceiverInfo(prevState => prevState.filter((_, index) => index !== delIndex));
    };

    const handleFileChange = (e) => {
        setMailFile([...e.target.files]);
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

        formData.append('mailInfo', new Blob([JSON.stringify(mailInfo)], { type: 'application/json' }));
        mailFile.forEach(file => formData.append('mailFile', file));
        
        console.log([...formData.entries()]);

        try {
            await dispatch(callPostInsertMailAPI({ formData }));
            // navigate('/mails/send');
        } catch (error) {
            console.error(error);
        }
    };

    // 취소 버튼 미완성
    // const backMailList = () => () => {
    //     navigate(`/mails/${part}`);
    // }

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
            <div className="input-container d-flex">
                <label>받는 사람</label>
                <div>
                    <div className="mb-2">
                        {receiverInfo.map((receiver, index) => (
                            <div key={index} className="d-inline selected-recipient">
                                <span>{receiver.receiverMem}</span>
                                <i className="bi bi-x" onClick={() => removeReceiver(index)}></i>
                            </div>
                        ))}
                    </div>
                    <select
                        className="form-select"
                        id="recipient"
                        onChange={addReceiver}
                        value={mailForm.receivers}>
                        <option selected>수신자를 선택하세요</option>
                        {memberList.map((item, index) => {
                            return (
                                <option
                                    key={index}
                                    value={item.memberNo}>
                                    {item.memberName}({item.department.depName}) {item.companyEmail}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="input-container">
                <label htmlFor="file">첨부파일</label>
                <div className="file-input">
                    <input type="file" id="formFile" multiple onChange={handleFileChange} />
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
            <div className="d-flex justify-content-end mt-4">
                <button className="back-btn">취소</button>
                <button type="submit" onClick={submitMailClick} className="move-btn">전송</button>
            </div>
        </>
    );
}

export default MailForm;