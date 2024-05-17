import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import AppLine from "../../components/approvals/AppLine";
import RefLine from "../../components/approvals/RefLine";
import Style from "./Approvals.module.css"
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { callAppAPI, callUpdateApprovalAPI } from "../../apis/ApprovalAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";

function ApprovalDetail() {
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const approval = useSelector(state => state.approvalReducer);
    const param = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [appAction, setAppAction] = useState('');
    const [refusal, setRefusal] = useState('');

    console.log('상세', approval)

    const quillRef = useRef(null);

    useEffect(() => {
        dispatch(callAppAPI({ approvalNo: param.approvalNo }));
    }, [dispatch])

    const onClickListHandler = () => {
        navigate(`/approvals`, { replace: false });
    }

    const onChangeRefusalHandler = (e) => {
        setRefusal(e.target.value);
    }

    const onClickCancelAppHandler = () => {
        const appUpdate = {
            action: '회수'
        }
        dispatch(callUpdateApprovalAPI(appUpdate, approval.approvalNo))
        .then(() => navigate(`/approvals`, { replace: false }));
        //돌아가면 카테고리별 문서 수 다시 안불러옴 수정 필요
    }

    const onClickSubmitHandler = () => {
        const appUpdate = {
            action: appAction,
            refusal: refusal
        }
        if (appAction === '') {
            alert('승인 또는 반려를 선택해주세요');
        } else if (appAction === "반려" && refusal.trim() === '') {
            alert('반려 사유를 입력해주세요');
        } else {
            try {
                dispatch(callUpdateApprovalAPI(appUpdate, approval.approvalNo));
                navigate(`/approvals`, { replace: false });
            } catch {
                alert('에러');
            }
        }
    }

    return (
        <main id="main" className="main">
            {approval?.approvalNo == param.approvalNo &&
                <div>
                    <h3>기안상세</h3>
                    <br />
                    <h5>결재선</h5>
                    <AppLine appline={approval.appLineList} />
                    <h5>참조선</h5>
                    <RefLine refline={approval.refLineList} />
                    <h5>문서정보</h5>
                    <table className={Style.appTable}>
                        <tbody>
                            <tr>
                                <th width={'12%'}>양식</th>
                                <td width={'38%'}>{approval.form.formName}</td>
                                <th width={'12%'}>기안부서</th>
                                <td width={'38%'}>{approval.member.department.depName}</td>
                            </tr>
                            <tr>
                                <th >첨부파일</th>
                                <td >
                                {Array.isArray(approval.appFileList) && approval.appFileList.map((item, index) => (<span><a href={`img/approvals/${item.fileUrl}`} download>{item.fileUrl}</a><br /></span>))}
                                </td>
                                <th >기안자</th>
                                <td>{approval.member.memberName}</td>
                            </tr>
                            <tr>
                                <th >제목</th>
                                <td>{approval.appTitle}</td>
                                <th >기안일자</th>
                                <td>{approval.appDate}</td>
                            </tr>
                        </tbody>
                    </table>
                    <h5>내용</h5>
                    <ReactQuill
                        style={{ height: "500px", margin1: "4px", overflowY: 'auto' }}
                        ref={quillRef}
                        readOnly
                        theme="snow"
                        modules={{toolbar:false}}
                        value={approval.appContents}
                        placeholder="내용을 입력하세요." />
                    <br />

                    {approval?.appLineList.find(item => item.alMember.memberNo === loginToken.memberNo) ?
                        <div>
                            <h5>처리</h5>
                            <table className={Style.appTable}>
                                <tbody>
                                    <tr>
                                        <th width={'15%'}>구분</th>
                                        <td width={'15%'} style={{ textAlign: 'center' }}>
                                            <input type="radio" name="appRadio" id="appRadio1" onChange={() => setAppAction("결재")} />
                                            <label for="appRadio1">승인</label>
                                        </td>
                                        <td width={'15%'} style={{ textAlign: 'center' }}>
                                            <input type="radio" name="appRadio" id="appRadio2" onChange={() => setAppAction("반려")} />
                                            <label for="appRadio2">반려</label>
                                        </td>
                                        <td></td>
                                    </tr>
                                    {appAction === "반려" &&
                                        <tr>
                                            <th width={'15%'}>반려사유</th>
                                            <td colSpan={3} style={{ padding: '5px 5px 5px 5px' }}>
                                                <textarea style={{ resize: 'none', width: '100%', border: 'none' }} value={refusal} onChange={onChangeRefusalHandler}></textarea>
                                            </td>
                                        </tr>}
                                </tbody>
                            </table>
                        </div> : null}
                    <div className={Style.appBtn}>
                        <button className="back-btn" onClick={onClickListHandler}>목록</button>

                        {loginToken.memberNo === approval?.member.memberNo && approval?.appStatus === "대기" ?
                            <button className="move-btn" onClick={onClickCancelAppHandler}>회수</button> : null}

                        {approval?.appLineList.find(item => item.alMember.memberNo === loginToken.memberNo) ?
                            <button className="move-btn" onClick={onClickSubmitHandler}>처리</button> : null}
                    </div>
                </div>
            }
        </main>
    )
}
export default ApprovalDetail;