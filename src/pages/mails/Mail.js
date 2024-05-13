import { useState } from "react";
import SearchBar from "../../components/contents/SearchBar";
import "./mail.css";
import ButtonGroup from "../../components/contents/ButtonGroup";
import ReceiveMail from "../../components/lists/mails/ReceiveMail";
import SendMail from "../../components/lists/mails/SendMail";
import { useNavigate } from "react-router-dom";

function Mail() {
    const navigate = useNavigate();

    const [part, setPart] = useState("receive");
    const receiveHandler = () => {
        setPart("receive");
        navigate('/mails/receive');
    };
    const sendHandler = () => {
        setPart("send");
        navigate('/mails/send');
    };

    const insertHandler = () => navigate('/mails/insert');

    const buttons = [
        {label: "삭제", styleClass: "back"},
        {label: "메일 쓰기", styleClass: "move", onClick: insertHandler}
    ];
    
    return (
        <>
            <main id="main" className="main">
                <div className="title">
                    <h2>메일</h2>
                    <SearchBar />
                </div>
                <div className="mt-3 d-flex justify-content-between align-middle">
                    <div className="mail-btn">
                        <button
                            className={`${part == "receive" ? 'focus-btn ps-0 me-4 fs-5' : 'non-focus-btn ps-0 me-4 fs-5'}`}
                            onClick={() => receiveHandler()}>받은 메일함</button>
                        <button
                            className={`${part == "send" ? 'focus-btn fs-5' : 'non-focus-btn fs-5'}`}
                            onClick={() => sendHandler()}>보낸 메일함</button>
                    </div>
                    <ButtonGroup buttons={buttons} />
                </div>
                {
                    part == "receive"? <ReceiveMail part={part} /> : <SendMail part={part} />
                }
            </main>
        </>
    );
}

export default Mail;