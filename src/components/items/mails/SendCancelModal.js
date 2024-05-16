import { useState } from "react";
import "../../../pages/mails/mail.css";
import ButtonGroup from "../../contents/ButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { callPutSendMailCancel } from "../../../apis/MailAPICalls";
import { useParams } from "react-router-dom";

function SendCancelModal({setSendCancelModal}) {
    const {mailNo} = useParams();
    const result = useSelector(state => state.mailReducer);
    const cancelMail = result.mailcancel;
    const dispatch = useDispatch();

    const [failedCancellation, setFailedCancellation] = useState(false);

    const buttonClick = async (label) => {
        if(label === "취소") {
            setSendCancelModal(false);
        }else if(label === "발송 취소") {
            const success = await dispatch(callPutSendMailCancel(mailNo));
            if (!success) {
                setFailedCancellation(true);
            }
        }else if(label === "확인") {
            setSendCancelModal(false);
        }
    };

    const modalContent = failedCancellation ? (
        <>
            <p>발송 취소에 실패했습니다.</p>
        </>
    ) : cancelMail !== null ? (
        <p>{cancelMail ? "발송이 취소되었습니다." : "수신자가 해당 메일을 열람하여 발송 취소가 불가능합니다."}</p>
    ) : (
        <>
            <p>해당 메일의 발송을 취소하시겠습니까?</p>
            <p>수신자가 메일을 읽지 않았을 경우 취소가 가능합니다.</p>
        </>
    );

    const buttons = [
        {"label": "취소", "styleClass": "back", onClick: () => buttonClick("취소") },
        {"label": "발송 취소", "styleClass": "move", onClick: () => buttonClick("발송 취소")}
    ];
    
    const confirmButton = [
        {label: "확인", styleClass: "move", onClick: () => buttonClick("확인")}
    ]

    const modalButton = failedCancellation ? (
        <>
            <p>발송 취소에 실패했습니다.</p>
        </>
    ) : cancelMail !== null ? (
        <ButtonGroup buttons={confirmButton} />
    ) : (
        <ButtonGroup buttons={buttons} />
    );

    return (
        <div className="modal-back">
            <div className="modal-box">
                <div className="modal-content">
                    {modalContent}
                </div>
                <>
                {modalButton}
                </>
            </div>
        </div>
    );
}

export default SendCancelModal;