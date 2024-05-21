import { useState } from "react";
import { callGetResourcesAPI, callPostResourceAPI } from "../../apis/ResourceAPICalls";
import ButtonGroup from "../contents/ButtonGroup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function InsertResourceForm({ part, setRegistModal }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [insertResult, setInsertResult] = useState(0);

    const korPart = part === 'conferences' ? "회의실" : "차량";

    const [rscForm, setRscForm] = useState({
        rscCategory: korPart,
        rscName: '',
        conferenceFloor: 0,
        conferenceRoom: 0,
        vehicleNum: '',
        rscCap: 0,
        rscIsAvailable: '',
        rscDescr: null
    });

    const buttonClick = async (label) => {
        if (label == "취소") {
            setRegistModal(false);
        } else if (label == "등록") {
            submitRscClick();
            setRegistModal(false);
        }
    };

    const registButtons = [
        { label: "취소", styleClass: "back", onClick: () => buttonClick("취소") },
        { label: "등록", styleClass: "move", onClick: () => buttonClick("등록") }
    ];

    const onChangeHandler = (e) => {
        const { name, value } = e.target;

        setRscForm({
            ...rscForm,
            [name]: value
        });
    };

    const onRadioChangeHandler = (e) => {
        setRscForm({
            ...rscForm,
            rscIsAvailable: e.target.value === "available"
        });
    };

    const submitRscClick = async () => {

        if (rscForm.conferenceFloor < 0 || rscForm.conferenceRoom < 0) {
            alert("층과 호수는 음수 값을 입력할 수 없습니다. 다시 입력해주세요.");
            return;
        } else if (rscForm.rscCap < 0) {
            alert("인원은 음수 값을 입력할 수 없습니다. 다시 입력해주세요.");
            return;
        }

        const floor = Number(rscForm.conferenceFloor);
        const room = Number(rscForm.conferenceRoom);
        const capacity = Number(rscForm.rscCap);

        const rscInfo = part === 'conferences'
            ? `${floor}층 ${room}호`
            : rscForm.vehicleNum;

        const rscDto = {
            rscCategory: rscForm.rscCategory,
            rscName: rscForm.rscName,
            rscInfo: rscInfo,
            rscCap: capacity,
            rscIsAvailable: rscForm.rscIsAvailable,
            rscDescr: rscForm.rscDescr
        };

        try {
            await dispatch(callPostResourceAPI({ rscDto }));
        } catch (error) {
            console.error(error);
        }
    };

    const rscPart = part === 'conferences';

    return (
        // { insertResult == 0 ? (
        //         <RscDetailContent />
        //     ) : (
                <div className="modal-content">
                    {
                        part === 'conferences' ? <h5 className="fw-bold">회의실 등록</h5> : <h5 className="fw-bold">차량 등록</h5>
                    }
                    <div className="rsc-form">
                        <label htmlFor="rscName">{rscPart ? "회의실 명" : "차종"}</label>
                        <input
                            type="text"
                            name="rscName"
                            value={rscForm.rscName}
                            id="rscName"
                            onChange={onChangeHandler}
                            placeholder={rscPart ? "회의실 명을 입력하세요" : "차종을 입력하세요"} /> <br />
                        {rscPart ? (
                            <>
                                <label>위치</label>
                                <div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="conferenceFloor"
                                        value={rscForm.conferenceFloor}
                                        onChange={onChangeHandler}
                                        placeholder="00" /><span>층</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="conferenceRoom"
                                        value={rscForm.conferenceRoom}
                                        onChange={onChangeHandler}
                                        placeholder="0000" /><span>호</span> <br />
                                </div>
                            </>
                        ) : (
                            <>
                                <label htmlFor="vehicleNum">차량 번호</label>
                                <input
                                    type="text"
                                    name="vehicleNum"
                                    value={rscForm.vehicleNum}
                                    onChange={onChangeHandler}
                                    placeholder="차량 번호를 입력하세요" /> <br />
                            </>
                        )}
                        <label htmlFor="rscCap">{rscPart ? "수용 가능 인원" : "탑승 가능 인원"}</label>
                        <input
                            type="text"
                            name="rscCap"
                            value={rscForm.rscCap}
                            id="rscCap"
                            onChange={onChangeHandler}
                            placeholder="00" /><span>명</span> <br />
                        <label htmlFor="rscIsAvailable">상태</label>
                        <div className="rsc-radio">
                            <input
                                type="radio"
                                className="form-check-input border mt-3"
                                name="checkStatus"
                                value="available"
                                id="available"
                                checked={rscForm.rscIsAvailable === true}
                                onChange={onRadioChangeHandler} />
                            <label htmlFor="available">사용 가능</label>
                            <input
                                type="radio"
                                className="form-check-input border mt-3"
                                name="checkStatus"
                                value="unavailable"
                                id="unavailable"
                                checked={rscForm.rscIsAvailable === false}
                                onChange={onRadioChangeHandler} />
                            <label htmlFor="unavailable">사용 불가능</label>
                        </div>
                        <div>
                            <label htmlFor="rscDescr">비고</label>
                            <textarea
                                className="form-control"
                                id="rscDescr"
                                name="rscDescr"
                                value={rscForm.rscDescr}
                                onChange={onChangeHandler}
                                placeholder="추가 사항을 입력하세요" /> <br />
                        </div>
                    </div>
                    <ButtonGroup buttons={registButtons} />
                </div>
        //     )
        // }
    );
}

export default InsertResourceForm;