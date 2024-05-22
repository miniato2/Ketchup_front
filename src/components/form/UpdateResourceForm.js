import { useDispatch } from "react-redux";
import { callGetResourcesAPI, callPutResourceAPI } from "../../apis/ResourceAPICalls";
import ButtonGroup from "../contents/ButtonGroup";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function UpdateResourceForm({ setUpdateClick, resourceDetail, selectRscNo }) {
    const dispatch = useDispatch();
    const { part } = useParams();
    const [formState, setFormState] = useState({
        rscIsAvailable: resourceDetail.rscIsAvailable,
        rscDescr: resourceDetail.rscDescr
    });

    const buttonClick = (label) => {
        if (label == "저장") {
            submitRscUpdate();
            setUpdateClick(false);
        } else if (label == "취소") {
            setUpdateClick(false);
        }
    };

    const updateButtons = [
        { label: "취소", styleClass: "back", onClick: () => buttonClick("취소") },
        { label: "저장", styleClass: "move", onClick: () => buttonClick("저장") }
    ];
    
    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const rscPart = part === 'conferences';

    const submitRscUpdate = async () => {
        const updateRscDto = {
            rscIsAvailable: formState.rscIsAvailable,
            rscDescr: formState.rscDescr
        };

        try {
            await dispatch(callPutResourceAPI({ selectRscNo, updateRscDto }));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="modal-content">
                <h4>{resourceDetail.rscName} 수정</h4>
                <div className="rsc-form">
                    <label htmlFor="rscName">{rscPart ? "회의실 명" : "차종"}</label>
                    <input
                        type="text"
                        placeholder={resourceDetail.rscName}
                        readOnly /> <br />
                    {rscPart ? (
                        <>
                            <label>위치</label>
                            <input
                                type="text"
                                placeholder={resourceDetail.rscInfo}
                                readOnly /> <br />
                        </>
                    ) : (
                        <>
                            <label htmlFor="vehicleNum">차량 번호</label>
                            <input
                                type="text"
                                placeholder={resourceDetail.vehicleNum}
                                readOnly /> <br />
                        </>
                    )}
                    <label htmlFor="rscCap">{rscPart ? "수용 가능 인원" : "탑승 가능 인원"}</label>
                    <input
                        type="text"
                        className="input-number"
                        placeholder={resourceDetail.rscCap}
                        readOnly /><span>명</span> <br />




                    <label htmlFor="rscIsAvailable">상태</label>
                    <div className="rsc-radio">
                        <input
                            type="radio"
                            className="form-check-input border mt-3"
                            name="rscIsAvailable"
                            value="true"
                            id="available"
                            checked={formState.rscIsAvailable === true}
                            onChange={onChangeHandler}
                        />
                        <label htmlFor="available">사용 가능</label>
                        <input
                            type="radio"
                            className="form-check-input border mt-3"
                            name="rscIsAvailable"
                            value="false"
                            id="unavailable"
                            checked={formState.rscIsAvailable === false}
                            onChange={onChangeHandler}
                        />
                        <label htmlFor="unavailable">사용 불가능</label>
                    </div>




                    <div>
                        <label htmlFor="rscDescr">비고</label>
                        <textarea
                            className="form-control"
                            id="rscDescr"
                            name="rscDescr"
                            value={formState.rscDescr}
                            onChange={onChangeHandler}
                            placeholder={resourceDetail.rscDescr} /> <br />
                    </div>
                </div>
            </div>
            <ButtonGroup buttons={updateButtons} />
        </>
    );
}

export default UpdateResourceForm;