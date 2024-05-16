import ButtonGroup from "../../contents/ButtonGroup";
import "../../../pages/mails/mail.css";

function MailDeleteModal({setDeleteModal}) {
    const buttonClick = (label) => {
        if(label === "취소") {
            setDeleteModal(false);
        }
    };

    const buttons = [
        { "label": "취소", "styleClass": "back", onClick: () => buttonClick("취소") },
        { "label": "삭제", "styleClass": "move" }
    ];

    return (
        <div className="modal-back">
            <div className="modal-box">
                <div>
                    <p>__개의 메일이 선택되었습니다.</p>
                    <p>정말 삭제하시겠습니까?</p>
                </div>
                <ButtonGroup buttons={buttons} />
            </div>
        </div>
    );
}

export default MailDeleteModal;