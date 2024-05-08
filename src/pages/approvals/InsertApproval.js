import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import Table from 'react-bootstrap/Table';

function InsertApproval() {

    const [value, setValue] = useState("");
    const quillRef = useRef(null);

    return (
        <main className="main" id="main">
            <h1>기안등록</h1>
            <div>
            <Table>
                <thead>
                    <tr>
                        <th style={{width: '127px', height: '37px'}}>구분</th>
                        <th style={{width: '127px', height: '37px'}}>결재자</th>
                        {/*  */}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>직급</td>
                        <td>대리</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>성명</td>
                        <td>김대리</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
            </div>
            <div>
                <h1>참조선 영역</h1>
            </div>
            <Table style={{display:"flex", flexDirection:"row"}}>
                <tbody>
                    <tr>
                        <td>양식</td>
                        <td><select></select></td>
                    </tr>
                    <tr>
                        <td>첨부파일</td>
                        <td><input type="file"></input></td>
                    </tr>
                    <tr>
                        <td>제목</td>
                        <td><input type="text"></input></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>기안부서</td>
                        <td>dd</td>
                    </tr>
                    <tr>
                        <td>기안자</td>
                        <td>dd</td>
                    </tr>
                    <tr>
                        <td>기안일자</td>
                        <td>dd</td>
                    </tr>
                </tbody>
            </Table>
            <ReactQuill
                style={{ height: "400px", margin: "4px" }}
                ref={quillRef}
                theme="snow"
                value="dd"
                onChange={setValue}
                placeholder="내용을 입력하세요." />
        </main>
    )
}
export default InsertApproval;