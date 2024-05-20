import "../../../pages/resources/resource.css";
import ButtonGroup from "../../contents/ButtonGroup";
import InsertResourceForm from "../../form/InsertResourceForm";

function RscRegistModal({ setRegistModal, part }) {
    const buttonClick = (label) => {
        if (label == "취소") {
            setRegistModal(false);
        }
    };

    const registButtons = [
        { label: "취소", styleClass: "back", onClick: () => buttonClick("취소") },
        { label: "등록", styleClass: "move", onClick: () => buttonClick("등록") }
    ];

    return (
        <div className="modal-back">
            <div className="modal-box">
                <div className="modal-content">
                    {
                        part === 'conferences' ? <h5 className="fw-bold">회의실 등록</h5> : <h5 className="fw-bold">차량 등록</h5>
                    }
                    <InsertResourceForm part={part} />
                </div>
                <ButtonGroup buttons={registButtons} />
            </div>
        </div>
    );
}

export default RscRegistModal;