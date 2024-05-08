//기안 상세

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function ApprovalDetail(){

    const param = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        
    })

    return(
        <main id="main" className="main">
            <h1>상세</h1>
            <h1>{param.approvalNo}</h1>
            <h1>결재선</h1>
            <h1>참조선</h1>
            <h1>문서정보</h1>
            <h1>내용</h1>
            <h1>승인/반려</h1>
            <h1>버튼영역</h1>
        </main>
    )
}
export default ApprovalDetail;