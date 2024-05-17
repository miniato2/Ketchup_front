import { useNavigate } from "react-router-dom";
import ButtonGroup from "../../contents/ButtonGroup";
import FormatDate from "../../contents/FormatDate";
import { useEffect, useState } from "react";
import SendCancelModal from "./SendCancelModal";
import MailDeleteModal from "./MailDeleteModal";

function MailContent({ content, part, mailNo }) {
    const navigate = useNavigate();
    const [sendCancelModal, setSendCancelModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [delMailList, setDelMailList] = useState([]);

    useEffect(
        () => {
            console.log("Updated delMailList:", delMailList);
            if(delMailList.length != 0) {
                setDeleteModal(true);
            } 
        }, [delMailList]
    );
    
    const buttonClick = (label) => {
        if(label === "답장") {
            navigate("/mails/reply");
        }else if(label === "발송 취소") {
            setSendCancelModal(true);
        }else if(label === "삭제") {
            setDelMailList((prevDelMailList) => [...prevDelMailList, mailNo]);
        }
    };

    const receiveButtons = [
        { label: "삭제", styleClass: "back", onClick: () => buttonClick("삭제") },
        { label: "답장", styleClass: "move", onClick: () => buttonClick("답장") }
    ];

    const sendButtons = [
        { label: "삭제", styleClass: "back", onClick: () => buttonClick("삭제") },
        { label: "발송 취소", styleClass: "move", onClick: () => buttonClick("발송 취소") }
    ];

    const formatDate = FormatDate(content.sendMailTime);

    return (
        <>
            {sendCancelModal ? <SendCancelModal setSendCancelModal={setSendCancelModal} /> : null}
            {deleteModal ? <MailDeleteModal setDeleteModal={setDeleteModal} part={part} delMailList={delMailList} setDelMailList={setDelMailList} /> : null}
            <div>
                <div>
                    <h2 className="d-inline">{content.mailTitle}</h2>
                    {
                        part === 'receive' ? <ButtonGroup buttons={receiveButtons} /> : <ButtonGroup buttons={sendButtons} />
                    }
                </div>
                <p>{formatDate}</p>
                <div>
                    {
                        part === 'receive' ? <span>보낸 사람</span> : <span>받는 사람</span>
                    }
                    <span>{content.senderMem}</span>
                </div>
                <div>
                    <span>첨부 파일</span>
                    <span>파일</span>
                </div>
                <hr />
                <div>
                    {content.mailContent}
                </div>
            </div>
        </>
    );
}

export default MailContent;