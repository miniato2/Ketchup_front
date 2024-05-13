import { useNavigate } from "react-router-dom";
import ButtonGroup from "../../contents/ButtonGroup";
import FormatDate from "../../contents/FormatDate";

function MailContent({ content }) {
    const navigate = useNavigate();

    const buttonClick = (label) => {
        if(label == "답장") {
            navigate("/mails/reply");
        }
    };

    const buttons = [
        {label: "삭제", styleClass: "back"},
        {label: "답장", styleClass: "move", onClick: () => buttonClick("답장")}
    ];

    const formatDate = FormatDate(content.sendMailTime);
    
    return (
        <div>
            <div>
                <h2 className="d-inline">{content.mailTitle}</h2>
                <ButtonGroup buttons={buttons} />
            </div>
            <p>{formatDate}</p>
            <div>
                <span>받는 사람</span>
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
    );
}

export default MailContent;