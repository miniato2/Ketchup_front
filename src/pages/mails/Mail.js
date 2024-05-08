import { useState } from "react";
import SearchBar from "../../components/contents/SearchBar";
// import "../../mail.css";
import MailList from "../../components/lists/MailList";

function Mail() {
    const [part, setPart] = useState("receive");
    const receiveHandler = () => setPart("receive");
    const sendHandler = () => setPart("send"); 

    return (
        <>
            <main id="main" className="main">
                <div className="title">
                    <h2>메일</h2>
                    <SearchBar />
                </div>
                <div className="mt-3 mail-btn">
                    <button 
                        className={`${part == "receive"? 'focus-btn ps-0 me-4 fs-5' : 'non-focus-btn ps-0 me-4 fs-5'}`}
                        onClick={() => receiveHandler()}>받은 메일함</button>
                    <button 
                        className={`${part == "send"? 'focus-btn fs-5' : 'non-focus-btn fs-5'}`}
                        onClick={() => sendHandler()}>보낸 메일함</button>
                </div>
                <MailList part={part} />
            </main>
        </>
    );
}

export default Mail;