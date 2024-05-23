import { useEffect, useState } from "react";
import "../../../pages/resources/resource.css";
import RscDetailContent from "./RscDetailContent";
import UpdateResourceForm from "../../form/UpdateResourceForm";
import { callGetResourceDetailAPI, callGetResourcesAPI } from "../../../apis/ResourceAPICalls";
import { useDispatch, useSelector } from "react-redux";

function RscModal({setModal, selectRscNo, part}) {
    const result = useSelector(state => state.resourceReducer);
    const resourceDetail = result.resourcedetail || [];
    const dispatch = useDispatch();
    const [updateClick, setUpdateClick] = useState(false);

    useEffect(
        () => {
            // dispatch(callGetResourcesAPI(part));
            dispatch(callGetResourceDetailAPI(selectRscNo));
        }, [dispatch, selectRscNo]
    );

    return (
        <div className="modal-back">
            <div className="modal-box">
                {
                    updateClick ? 
                    <UpdateResourceForm 
                        setUpdateClick={setUpdateClick}
                        resourceDetail={resourceDetail}
                        selectRscNo={selectRscNo} />
                    : 
                    <RscDetailContent 
                        setModal={setModal} 
                        setUpdateClick={setUpdateClick}
                        resourceDetail={resourceDetail} />
                }
            </div>
        </div>
    );
}

export default RscModal;