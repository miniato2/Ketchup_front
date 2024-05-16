import { useEffect, useState } from "react";
import "../../../pages/mails/mail.css";
import ButtonGroup from "../../contents/ButtonGroup";
import { useDispatch, useSelector } from "react-redux";
import { callPutSendMailCancel } from "../../../apis/MailAPICalls";
import { useParams } from "react-router-dom";

function SendCancelModal({setSendCancelModal}) {
    const {mailNo} = useParams();
    const result = useSelector(state => state.mailReducer);
    const cancelMail = result.cancelmail || null;
    const dispatch = useDispatch();

    const [cancelResult, setCancelResult] = useState(null);

    const buttonClick = async (label) => {
        if(label === "취소") {
            setSendCancelModal(false);
        }if(label === "발송 취소") {
            const response = await dispatch(callPutSendMailCancel(mailNo));
            setCancelResult(response); // API 결과에 따라 모달 내용 변경
        }
    };

    console.log("🍕🍕🍕🍕🍕🍕");
    console.log(cancelMail);

    const buttons = [
        {"label": "취소", "styleClass": "back", onClick: () => buttonClick("취소") },
        {"label": "발송 취소", "styleClass": "move", onClick: () => buttonClick("발송 취소")}
    ];

    const modalContent = cancelResult ? (
        cancelResult.success ? <p>발송이 취소되었습니다.</p> : <p>발송 취소에 실패했습니다.</p>
    ) : (
        <>
            <p>해당 메일의 발송을 취소하시겠습니까?</p>
            <p>수신자가 메일을 읽지 않았을 경우 취소가 가능합니다.</p>
        </>
    );

    return (
        <div className="modal-back">
            <div className="modal-box">
                <div className="modal-content">
                    {modalContent}
                </div>
                <ButtonGroup buttons={buttons} />
            </div>
        </div>
    );
}

export default SendCancelModal;