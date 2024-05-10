import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import AppLine from "../../components/approvals/AppLine";
import RefLine from "../../components/approvals/RefLine";
import Style from "./Approvals.module.css"
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { callAppAPI } from "../../apis/ApprovalAPICalls";

function ApprovalDetail() {
    const approval = useSelector(state => state.approvalReducer);
    const param = useParams();
    const dispatch = useDispatch();

    const quillRef = useRef(null);

    useEffect(() => {
        dispatch(callAppAPI({ approvalNo: param.approvalNo }));
    }, [])

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
                                <td ><a href={approval.appFileList[0]}>ㅇㅇㅇ</a></td>
                                {/* 나중에 리스트 형식으로 다시 만들자 + 경로 재설정 */}

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
                        value={approval.appContents}
                        placeholder="내용을 입력하세요." />

                    <h1>승인/반려</h1>
                    <div>
                        
                    </div>

                    <div className={Style.appBtn}>
                        {/* 사원이 결재자인지 작성자인지에 따라 회수 또는 처리 활성화 & 대기중일때만 회수 활성화 */}
                        <button className="back-btn">목록</button>
                        <button className="move-btn">회수</button>
                        <button className="move-btn">처리</button>
                    </div>
                </div>
            }
        </main>
    )
}
export default ApprovalDetail;