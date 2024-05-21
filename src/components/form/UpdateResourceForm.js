import { useDispatch } from "react-redux";
import { callGetResourcesAPI } from "../../apis/ResourceAPICalls";
import ButtonGroup from "../contents/ButtonGroup";
import { useParams } from "react-router-dom";

function UpdateResourceForm({setUpdateClick}) {
    const dispatch = useDispatch();
    const {part} = useParams();

    const buttonClick = async (label) => {
        if(label == "저장") {
            await dispatch(callGetResourcesAPI(part));
        }else if(label == "취소") {
            setUpdateClick(false);
        }
    };

    const updateButtons = [
        {label: "취소", styleClass: "back", onClick: () => buttonClick("취소")},
        {label: "저장", styleClass: "move", onClick: () => buttonClick("저장")}
    ];

    return (
        <>
            <div className="modal-content">
                모달 수정
            </div>
            <ButtonGroup buttons={updateButtons} />
        </>
    );
}

export default UpdateResourceForm;