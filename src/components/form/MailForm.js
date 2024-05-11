import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callMembersAPI } from "../../apis/MemberAPICalls";
import Editor from "../contents/Editor";

function MailForm() {
    const dispatch = useDispatch();
    const members = useSelector(state => state.memberReducer);
    const memberList = members.data?.content || [];

    useEffect(
        () => {
            dispatch(callMembersAPI());
        }, []
    );

    return (
        <>
            <div class="input-container">
                <label htmlFor="title">제목</label>
                <input type="text" className="form-control" id="title" placeholder="제목을 입력하세요" />
            </div>
            <div class="input-container">
                <label>받는 사람</label>
                <select className="form-select">
                    <option selected></option>
                    {memberList.map((item, index) => {
                        return (
                            <>
                                <option value={index}>{item.memberName}({item.department.depName}) {item.companyEmail}</option>
                            </>
                        );
                    })}
                </select>
            </div>
            <div class="input-container">
                <label htmlFor="file">첨부파일</label>
                <div className="file-input">
                    <input type="file" className="form-control-file" id="file" name="file" multiple />
                </div>
            </div>
            <Editor />
            <button type="submit" className="move-btn">전송</button>
        </>
    );
}

export default MailForm;