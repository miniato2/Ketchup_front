import { useEffect, useState } from "react";

function InsertResourceForm({part}) {
    const [rscForm, setRscForm] = useState({
        rscCategory: part,
        rscName: '',
        rscInfo: '',
        rscCap: 0,
        rscIsAvailable: false
    });

    useEffect(
        () => {
            dispatch(call)
        }
    )

    return (
        <div className="rsc-form">
            {
                part === 'conferences' ? (
                    <>
                        <label>회의실 명</label>
                        <input type="text" placeholder="회의실 명을 입력하세요" /> <br />
                        <label>수용 가능 인원</label>
                        <input type="number" className="form-control" placeholder="00" /><span>명</span> <br />
                        <label>위치</label>
                        <input type="number" className="form-control" placeholder="00" /><span>층</span>
                        <input type="number" className="form-control" placeholder="0000" /><span>호</span> <br />
                    </>
                ) : (
                    <>
                        <label>차량 번호</label>
                        <input type="text" placeholder="차량 번호를 입력하세요" /> <br />
                        <label>차종</label>
                        <input type="text" placeholder="차종을 입력하세요" /> <br />
                        <label>탑승 가능 인원</label>
                        <input type="number" placeholder="00" /><span>명</span> <br />
                    </>
                )
            }
            <label>상태</label>
            <div className="rsc-radio">
                <input type="radio" className="form-check-input" name="checkStatus" id="available" />
                <label for="available">사용 가능</label>
                <input type="radio" className="form-check-input" name="checkStatus" id="unavailable" />
                <label for="unavailable">사용 불가능</label>
            </div>
            <div>
                <label for="addInfo">비고</label>
                <textarea className="form-control" id="addInfo" placeholder="추가 사항을 입력하세요" /> <br />
            </div>
        </div>
    );
}

export default InsertResourceForm;