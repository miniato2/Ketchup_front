import "../../../pages/resources/resource.css";
import ButtonGroup from "../../contents/ButtonGroup";

function RscDetailModal({setModal}) {
    const buttonClick = (label) => {
        if(label = "취소") {
            setModal(false);
        }
    };

    const detailButtons = [
        {label: "취소", styleClass: "back", onClick: () => buttonClick("취소")},
        {label: "수정", styleClass: "move"}
    ];

    return (
        <div className="modal-back">
            <div className="modal-box">
                <div className="modal-content">
                    모달 상세
                </div>
                <ButtonGroup buttons={detailButtons} />
            </div>
        </div>
    );
}

export default RscDetailModal;