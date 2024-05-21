import { useEffect } from "react";
import ButtonGroup from "../../contents/ButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { callGetResourceDetailAPI } from "../../../apis/ResourceAPICalls";

function RscDetailContent({setModal, setUpdateClick, selectRscNo}) {
    const result = useSelector(state => state.resourceReducer);
    const resourceDetail = result.resourcedetail || [];
    const dispatch = useDispatch();

    console.log("🍖🍖🍖🍖🍖");
    console.log(selectRscNo);
    const buttonClick = (label) => {
        if(label == "수정") {
            setUpdateClick(true);
        }else if(label == "취소") {
            setModal(false);
        }
    };

    const detailButtons = [
        {label: "취소", styleClass: "back", onClick: () => buttonClick("취소")},
        {label: "수정", styleClass: "move", onClick: () => buttonClick("수정")}
    ];

    useEffect(
        () => {
            dispatch(callGetResourceDetailAPI(selectRscNo));
        }, [selectRscNo]
    );

    const rscCate = resourceDetail.rscCategory;

    return (
        <>
            <div className="modal-content">
                <h4>{resourceDetail.rscName} 정보</h4>
                <div>
                    <span className="detail-title">{rscCate === '회의실' ? "회의실 명" : "차종"}</span><span className="detail-content">{resourceDetail.rscName}</span>
                    <span className="detail-title">{rscCate === '회의실' ? "위치" : "차량 번호"}</span><span className="detail-content">{resourceDetail.rscInfo}</span>
                    <span className="detail-title">{rscCate === '회의실' ? "수용 가능 인원" : "탑승 가능 인원"}</span><span className="detail-content">{resourceDetail.rscCap}명</span>
                    <span className="detail-title">상태</span><span className="detail-content">{resourceDetail.rscIsAvailable ? "사용 가능" : "사용 불가능"}</span>
                    <span className="detail-title">비고</span><span className="detail-content">{resourceDetail.rscDescr}</span>
                </div>
            </div>
            <ButtonGroup buttons={detailButtons} />
        </>
    );
}

export default RscDetailContent;