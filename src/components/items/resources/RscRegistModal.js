import "../../../pages/resources/resource.css";
import InsertResourceForm from "../../form/InsertResourceForm";

function RscRegistModal({ setRegistModal, part }) {
    return (
        <div className="modal-back">
            <div className="modal-box">
                    <InsertResourceForm part={part} setRegistModal={setRegistModal} />
                </div>
        </div>
    );
}

export default RscRegistModal;