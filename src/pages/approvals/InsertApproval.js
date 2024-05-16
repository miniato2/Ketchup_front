import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import Style from "./Approvals.module.css"
import { decodeJwt } from "../../utils/tokenUtils";
import AppLine from "../../components/approvals/AppLine";
import RefLine from "../../components/approvals/RefLine";
import { callGetFormAPI, callInsertAppAPI } from "../../apis/ApprovalAPICalls";
import AppLineModal from "../../components/approvals/AppLineModal";
import RefLineModal from "../../components/approvals/RefLineModal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function InsertApproval() {
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const quillRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    //
    const [file, setFile] = useState(null);
    const [formNo, setFormNo] = useState('');
    const [appTitle, setAppTitle] = useState('');
    const [appContents, setAppContents] = useState('');

    const [appLine, setAppLine] = useState([{
        alMember: {
            memberNo: '', memberName: '',
            position: { positionName: '' },
            department: { depName: '' }
        },
        alType: '',
        sequence: ''
    }])

    const [refLine, setRefLine] = useState([{
        refMember: {
            refMemberName: ''
        }
    }])
    //

    const onChangeAppTitle = (e) => {
        setAppTitle(e.target.value);

    } //제목

    const onChangeAppContents = (e) => {
        setAppContents(e);

    } //내용

    const onChangeFileUpload = (e) => {
        // const filesArray = Array.from(e.target.files);
        // const filesList = [...filesArray];
        // console.log('filesList', filesList);
        // setFile(filesList);
        setFile(e.target.files[0]);
    }


    const onChangeForm = async (e) => {
        const result = await callGetFormAPI(e.target.value);

        if (result.status == 200) {
            setFormNo(result.data.formNo);
            setAppContents(result.data.formContents);
        } else {
            console.log('실패');
        }
    } //양식 변경

    const onClickCancelHandler = () => {
        navigate(`/approvals`, {replace:false})
    } //취소

    const onClickInsertApprovalHandler = () => {
        const formData = new FormData();

        console.log(appLine);
        console.log(refLine);

        formData.append("approval.appMemberNo", loginToken.memberNo);
        formData.append("approval.formNo", formNo);
        formData.append("approval.appTitle", appTitle);
        formData.append("approval.appContents", appContents);

        appLine.forEach((al, index) => {
            formData.append(`appLineDTOList[${index}].alMemberNo`, al.alMember.memberNo);
            formData.append(`appLineDTOList[${index}].alType`, al.alType);
            formData.append(`appLineDTOList[${index}].alSequence`, al.sequence);
        });

        refLine.forEach((rl, index) => {
            formData.append(`refLineDTOList[${index}].refMemberNo`, rl.refMember.memberNo);
        });

        if (Array.isArray(file)) {
            console.log(file);
            console.log('폼에 파일 추가')
            formData.append("multipartFileList", file);

        }

        // if(Array.isArray(file)){
        //     file.map((item, index) => {
        //         console.log('dd',item);
        //         formData.append(`multipartFileList[${index}]`, item)
        //     })
        // }
        console.log('사원번호', formData.get("approval.appMemberNo"));
        console.log('양식번호', formData.get("approval.formNo"));
        console.log('제목', formData.get("approval.appTitle"));
        console.log('내용', formData.get("approval.appContents"));
        console.log('결재선', formData.get(`appLineDTOList[0].alMemberNo`));
        console.log('결재선', formData.get(`appLineDTOList[0].alType`));
        console.log('결재선', formData.get(`appLineDTOList[0].alSequence`));
        console.log('참조선', formData.get("refLineDTOList[0].refMemberNo"));


        dispatch(callInsertAppAPI({ form: formData }));
    } //등록

    

    return (
        <main className="main" id="main">
            {modalControl.appLineModal ? <AppLineModal setModalControl={setModalControl} setAppLine={setAppLine} /> : null}
            {modalControl.refLineModal ? <RefLineModal setModalControl={setModalControl} setRefLine={setRefLine} /> : null}
            <h1>기안등록</h1>

            <label>결재선</label><button name='appLineModal' onClick={onClickModalControl}>추가</button>
            <AppLine appline={appLine} />

            <label>참조선</label><button name='refLineModal' onClick={onClickModalControl}>추가</button>
            <RefLine refline={refLine} />

            <table className={Style.appTable}>
                <tbody>
                    <tr>
                        <th width={'12%'}>양식</th>
                        <td width={'38%'}>
                            <select onChange={onChangeForm}>
                                <option value={0}>양식 선택</option>
                                <option value={1}>1번 양식</option>
                                <option value={2}>2번 양식</option>
                            </select>
                        </td>
                        <th width={'12%'}>기안부서</th>
                        <td width={'38%'}>{loginToken.depName}</td>
                    </tr>
                    <tr>
                        <th >첨부파일</th>
                        <td ><input type="file" multiple="multiple" onChange={onChangeFileUpload}></input></td>
                        <th >기안자</th>
                        <td>{loginToken.memberName}</td>
                    </tr>
                    <tr>
                        <th >제목</th>
                        <td><input type="text" name="appTitle" onChange={onChangeAppTitle}></input></td>
                        <th >기안일자</th>
                        <td>dd</td>
                    </tr>
                </tbody>
            </table>
            <ReactQuill
                style={{ height: "400px", margin: "4px", overflowY: "auto" }}
                ref={quillRef}
                theme="snow"
                name="appContents"
                onChange={onChangeAppContents}
                value={appContents}
                placeholder="내용을 입력하세요." />
            <div className={Style.appBtn}>
                <button className="back-btn" onClick={onClickCancelHandler}>취소</button>
                <button className="move-btn" onClick={onClickInsertApprovalHandler}>등록</button>
            </div>

        </main>
    )
}
export default InsertApproval;