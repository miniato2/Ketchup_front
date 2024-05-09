import { useSelector } from "react-redux";

import AppLine from "../../components/approvals/AppLine";
import RefLine from "../../components/approvals/RefLine";
import Table from 'react-bootstrap/Table';



function ApprovalDetail() {

    const approval = useSelector(state => state.approvalReducer);
    console.log('detail approval', approval);

    return (
        <main id="main" className="main">
            <h1>상세</h1>
            <h5>결재선</h5>
            <AppLine appline={approval.appLineList} />
            <h5>참조선</h5>
            <RefLine refline={approval.refLineList} />
            <h5>문서정보</h5>
            <Table>
                <tbody>
                    <tr>
                        <th>양식</th>
                        <td>{approval.form.formName}</td>
                        <th>기안부서</th>
                        <td>{approval.member.department.depName}</td>
                    </tr>
                    <tr>
                        <th>첨부파일</th>
                        <td>{ }</td>
                        <th>기안자</th>
                        <td>{approval.member.memberName}</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>{approval.appTitle}</td>
                        <th>기안일자</th>
                        <td>{approval.appDate}</td>
                    </tr>
                </tbody>
            </Table>
            <h5>내용</h5>

            <h1>승인/반려</h1>
            <h1>버튼영역</h1>
        </main>
    )
}
export default ApprovalDetail;