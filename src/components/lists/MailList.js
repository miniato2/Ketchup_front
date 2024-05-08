import ReceiveMail from "../items/mails/ReceiveMail";
import SendMail from "../items/mails/SendMail";

function MailList({part}) {
    return (
        <>
            {part == "receive"? <ReceiveMail /> : <SendMail />}
        </>
    );
}

export default MailList;