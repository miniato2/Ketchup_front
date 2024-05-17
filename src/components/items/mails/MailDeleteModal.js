import ButtonGroup from "../../contents/ButtonGroup";
import "../../../pages/mails/mail.css";
import { callPutDeleteMailAPI } from "../../../apis/MailAPICalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MailDeleteModal({ setDeleteModal, part, delMailList, setDelMailList }) {
    const result = useSelector(state => state.mailReducer);
    const deleteMail = result.deletemail || [];
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const buttonClick = async (label) => {
        if (label === "취소") {
            setDeleteModal(false);
            setDelMailList([]); 
        }else if (label === "삭제") {
            await dispatch(callPutDeleteMailAPI(part, delMailList));
        }else if(label === "확인") {
            setDeleteModal(false);
            setDelMailList([]); 
            navigate(`/mails/${part}`);
        }
    };

    const deleteButtons = [
        { label: "취소", styleClass: "back", onClick: () => buttonClick("취소") },
        { label: "삭제", styleClass: "move", onClick: () => buttonClick("삭제") }
    ];

    const noDelButton = [
        { label: "확인", styleClass: "move", onClick: () => buttonClick("확인") }
    ];

    const delModalContent = delMailList.length != 0 ?
        (
            deleteMail > 0 ?
                (
                    <div className="modal-box">
                        <div>
                            <p>{delMailList.length}개의 메일을 삭제했습니다.</p>
                        </div>
                        <ButtonGroup buttons={noDelButton} />
                    </div>
                ) : (
                    <div className="modal-box">
                        <div>
                            <p>{delMailList.length}개의 메일이 선택되었습니다.</p>
                            <p>정말 삭제하시겠습니까?</p>
                        </div>
                        <ButtonGroup buttons={deleteButtons} />
                    </div>
                )
        ) : (
            <div className="modal-box">
                <div>
                    <p>선택한 메일이 없습니다.</p>
                </div>
                <ButtonGroup buttons={noDelButton} />
            </div>
        );

    return (
        <div className="modal-back">
            {delModalContent}
        </div>
    );
}

export default MailDeleteModal;