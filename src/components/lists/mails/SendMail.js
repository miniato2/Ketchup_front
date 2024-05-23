import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callGetSendMailAPI } from "../../../apis/MailAPICalls";
import MailTable from "../../items/mails/MailTable";
import { useNavigate, useParams } from "react-router-dom";
import FormatDateTime from "../../contents/FormatDateTime";

function SendMail({ checkedItems, setCheckedItems, searchCondition, searchValue, isLoading, setIsLoading }) {
    const { part } = useParams();
    const [sortedMail, setSortedMail] = useState([]);
    const result = useSelector(state => state.mailReducer);
    const sendMail = result && result.sendmail && result.sendmail.length > 0 ? result.sendmail : null;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(
        () => {
            setIsLoading(true);
            dispatch(callGetSendMailAPI(searchCondition, searchValue))
                .finally(() => setIsLoading(false));
        }, [dispatch, searchCondition, searchValue]
    );

    useEffect(() => {
        if (sendMail) {
            const sorted = [...sendMail].sort((a, b) => new Date(b.sendMailTime) - new Date(a.sendMailTime));
            const formattedSortedMail = sorted.map(mail => ({
                ...mail,
                sendMailTime: FormatDateTime(mail.sendMailTime)
            }));
            setSortedMail(formattedSortedMail);
        }
    }, [sendMail]);

    const columns = [
        ['mailTitle', '제목'],
        ['receiverName', '수신자'],
        ['sendMailTime', '발신일시']
    ];

    const handleRowClick = (index) => () => {
        const mailNo = sendMail[index]?.mailNo;

        navigate(`/mails/detail/${mailNo}`, { state: { part } });
    };

    return (
        <div>
            <MailTable
                data={sortedMail}
                columns={columns}
                onRowClick={handleRowClick}
                part={part}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
                isLoading={isLoading}
                setIsLoading={setIsLoading} />
        </div>
    );
}

export default SendMail;