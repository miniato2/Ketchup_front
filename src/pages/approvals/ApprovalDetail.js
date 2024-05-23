import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import AppLine from "../../components/approvals/AppLine";
import RefLine from "../../components/approvals/RefLine";
import Style from "./Approvals.module.css"
import { useNavigate, useParams } from "react-router-dom";
import { callAppAPI, callUpdateApprovalAPI } from "../../apis/ApprovalAPICalls";
import { decodeJwt } from "../../utils/tokenUtils";
import { Editor } from '@tinymce/tinymce-react';

function ApprovalDetail() {
    const loginToken = decodeJwt(window.localStorage.getItem("accessToken"));
    const approval = useSelector(state => state.approvalReducer);
    const param = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [appAction, setAppAction] = useState('');
    const [refusal, setRefusal] = useState('');
    const editorRef = useRef(null);

    console.log('상세', approval);

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
                dispatch(callUpdateApprovalAPI(appUpdate, approval.approvalNo))
                    .then(() => navigate(`/approvals`, { replace: false }));
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
                                    {Array.isArray(approval.appFileList) &&
                                        approval.appFileList.map((item, index) => (
                                            <span>
                                                <a href={`/img/approvals/${item.fileUrl}`} download>{item.fileUrl}</a><br />
                                            </span>
                                        ))
                                    }
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

                    <Editor
                        apiKey='gpny7ynxol7wh1ohidmu4i9q5rb68uahrrop6uo0m4ixs78c'
                        initialValue={approval.appContents}
                        init={{
                            statusbar: false,
                            resize: false,
                            height: 700,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'table'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help | ' +
                                'table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                        disabled={true}
                    />

                    {approval?.appLineList.find(item => item.alMember.memberNo === loginToken.memberNo) || approval.appStatus === "반려" ?
                        <div>
                            <h5>처리</h5>
                            <table className={Style.appTable}>
                                <tbody>
                                    {approval?.appLineList.find(item => item.alMember.memberNo === loginToken.memberNo) ?
                                        <tr>
                                            <th width={'15%'}>구분</th>
                                            <td width={'15%'} style={{ textAlign: 'center' }}>
                                                <input
                                                    type="radio" name="appRadio" id="appRadio1"
                                                    onChange={() => setAppAction("결재")}
                                                />
                                                <label for="appRadio1">승인</label>
                                            </td>
                                            <td width={'15%'} style={{ textAlign: 'center' }}>
                                                <input
                                                    type="radio" name="appRadio" id="appRadio2"
                                                    disabled={
                                                        (approval?.appLineList.find((item) => item.alMember.memberNo === loginToken.memberNo)?.alType !== "전결")
                                                    }
                                                    onChange={() => setAppAction("전결")}
                                                />
                                                <label for="appRadio2">전결</label>
                                            </td>
                                            <td width={'15%'} style={{ textAlign: 'center' }}>
                                                <input
                                                    type="radio" name="appRadio" id="appRadio3"
                                                    onChange={() => setAppAction("반려")}
                                                />
                                                <label for="appRadio3">반려</label>
                                            </td>
                                            <td></td>
                                        </tr>
                                        : null}
                                    {appAction === "반려" || approval.appStatus === "반려" ?
                                        <tr>
                                            <th width={'15%'}>반려사유</th>
                                            <td colSpan={4} style={{ padding: '5px 5px 5px 5px' }}>
                                                <textarea
                                                    style={{ resize: 'none', width: '100%', border: 'none' }}
                                                    value={approval.appStatus === "반려" ? approval.refusal : refusal}
                                                    readOnly={approval.appStatus === "반려"}
                                                    onChange={onChangeRefusalHandler}
                                                >
                                                </textarea>
                                            </td>
                                        </tr> : null}
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