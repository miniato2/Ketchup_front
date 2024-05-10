import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import Style from "./Approvals.module.css"
import { decodeJwt } from "../../utils/tokenUtils";
import AppLine from "../../components/approvals/AppLine";
import RefLine from "../../components/approvals/RefLine";
import { useDispatch, useSelector } from "react-redux";
import { callInsertAppAPI } from "../../apis/ApprovalAPICalls";
import AppLineModal from "../../components/approvals/AppLineModal";

function InsertApproval() {
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const quillRef = useRef(null);
    const dispatch = useDispatch();

    console.log(loginToken);

    const [modalControl, setModalControl] = useState({
        appLineModal: false,
        refLineModal: false
    })
    const onClickModalControl = (e) => {
        setModalControl({
            ...modalControl,
            [e.target.name]: true
        })
    }

    const abc = useSelector(state => state.approvalReducer);

    const [ file, setFile ] = useState();

    const [ approval, setApproval ] = useState({
        formNo: '',
        appTitle: '',
        appContents: '',
    })

    const [ appLine, setAppLine ] = useState([{
        alMember : {
            memberNo: '',
            memberName: '',
            position: {
                positionName: ''
            },
            department: {
                depName: ''
            }
        },
        alType: '',
        alSequence: ''
    }])

    const [ refLine, setRefLine ] = useState([{
        refMember: {
            refMemberName: ''
        }
    }])
    
    // => 걍 리덕스로 approval 가져오고 거기에 세팅해서 보내는게 나을듯

    // 리덕스 안쓴다면 ? InsertApproval에도 결재선 state사용하고 모달에서 결재선 state 사용해야함

    const onChangeFormHandler = (e) => {

    }

    const onClickInsertApprovalHandler = () => {
        const formData = new FormData();
        formData.append("approval.appMemberNo", loginToken.memberNo);
        formData.append("approval.formNo", approval.formNo);
        formData.append("aprpoval.appTitle", approval.appTitle);
        formData.append("approval.appContents", approval.appContents);

        appLine.forEach((al, index) => {
            formData.append(`appLineDTOList[${index}].alMemberNo`, al.alMemberNo);
            formData.append(`appLineDTOList[${index}].alType`, al.alType);
            formData.append(`appLineDTOList[${index}].alSequence`, al.alSequence);
        });

        refLine.forEach((rl, index) => {
            formData.append(`refLineDTOList[${index}].refMemberNo`, rl.refMemberNo);
        });

        formData.append("multipartFileList", file);

        // dispatch(callInsertAppAPI());
    }

    const onChangeTestHandler = (e) => {
        console.log(e.target.value);

    }

    return (
        <main className="main" id="main">
            {modalControl.appLineModal ? <AppLineModal setModalControl={setModalControl} setAppLine={setAppLine}/> : null}
            {/* {modalControl.refLineModal ? <RefLineModal setRefLineModal={setModalControl} /> : null} */}
            <h1>기안등록</h1>

            <h5>결재선</h5><button name='appLineModal' onClick={onClickModalControl}>추가</button>
            <AppLine appline={appLine}/>

            <h5>참조선</h5><button name='refLineModal' onClick={onClickModalControl}>추가</button>
            <RefLine refline={refLine}/>

            <table className={Style.appTable}>
                <tbody>
                    <tr>
                        <th width={'12%'}>양식</th>
                        <td width={'38%'}>
                            <select onChange={onChangeTestHandler}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                            </select>
                        </td>
                        <th width={'12%'}>기안부서</th>
                        <td width={'38%'}>{loginToken.depName}</td>
                    </tr>
                    <tr>
                        <th >첨부파일</th>
                        <td ><input type="file" multiple="multiple"></input></td>
                        <th >기안자</th>
                        <td>{loginToken.memberName}</td>
                    </tr>
                    <tr>
                        <th >제목</th>
                        <td><input type="text"></input></td>
                        <th >기안일자</th>
                        <td>dd</td>
                    </tr>
                </tbody>
            </table>
            <ReactQuill
                style={{ height: "400px", margin: "4px", overflowY: "auto" }}
                ref={quillRef}
                theme="snow"
                value="dd"
                onChange={onChangeFormHandler}
                placeholder="내용을 입력하세요." />
            <div className={Style.appBtn}>
                <button className="back-btn">취소</button>
                <button className="move-btn" onClick={onClickInsertApprovalHandler}>등록</button>
            </div>

        </main>
    )
}
export default InsertApproval;