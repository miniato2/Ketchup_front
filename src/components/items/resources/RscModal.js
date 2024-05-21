import { useState } from "react";
import "../../../pages/resources/resource.css";
import RscDetailContent from "./RscDetailContent";
import UpdateResourceForm from "../../form/UpdateResourceForm";

function RscModal({setModal, selectRscNo}) {
    const [updateClick, setUpdateClick] = useState(false);

    return (
        <div className="modal-back">
            <div className="modal-box">
                {
                    updateClick ? 
                    <UpdateResourceForm 
                        setUpdateClick={setUpdateClick} />
                    : 
                    <RscDetailContent 
                        setModal={setModal} 
                        setUpdateClick={setUpdateClick}
                        selectRscNo={selectRscNo} />
                }
            </div>
        </div>
    );
}

export default RscModal;