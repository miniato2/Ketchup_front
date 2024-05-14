import { useState } from "react";
import "./mail.css";
import ReceiveMail from "../../components/lists/mails/ReceiveMail";
import SendMail from "../../components/lists/mails/SendMail";
import { useNavigate } from "react-router-dom";
import SearchBarValue from "../../components/contents/SearchBarValue";
// import { callGetReceiveMailAPI, callGetSendMailAPI } from "../../apis/MailAPICalls";

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

    // const mailSearch = (searchCondition, searchKeyword) => {
    //     dispatch(callGetReceiveMailAPI(searchCondition, searchKeyword));
    //     dispatch(callGetSendMailAPI(searchCondition, searchKeyword));
    // };

    const insertHandler = () => navigate('/mails/insert');

    return (
        <>
            <main id="main" className="main">
                <div className="title">
                    <h2>메일</h2>
                    <SearchBarValue />
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
                    <div>
                        <button className="back-btn">삭제</button>
                        <button className="move-btn" onClick={insertHandler}>메일 쓰기</button>
                    </div>
                </div>
                {
                    part == "receive"? <ReceiveMail part={part} /> : <SendMail part={part} />
                }
            </main>
        </>
    );
}

export default Mail;