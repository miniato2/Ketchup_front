import { useDispatch, useSelector } from "react-redux";
import FormatDate from "../../contents/FormatDate";
import { useEffect, useState } from "react";
import { callGetMailDetailAPI } from "../../../apis/MailAPICalls";

function ReplyMailContent({replyMailNo}) {
    // const result = useSelector(state => state.mailReducer);
    // const replyContent = result.maildetail || [];
    const dispatch = useDispatch();

    // const replyContent = await dispatch(callGetMailDetailAPI(replyMailNo));

    const [replyContent, setReplyContent] = useState(null);

    useEffect(() => {
        const fetchReplyMail = async () => {
            try {
                const response = await dispatch(callGetMailDetailAPI(replyMailNo));
                setReplyContent(response);
            } catch (error) {
                console.error("Error fetching reply mail:", error);
            }
        };

        fetchReplyMail();
    }, [dispatch, replyMailNo]);

    // console.log("🎇🎇🎇🎇🎇🎇🎇");
    // console.log(replyMailNo);

    const formatDate = FormatDate(replyMailNo.sendMailTime);
    const contentFile = replyContent.mailFiles || [];

    return (
        <>
        <div>
            <div className="mail-title">
                <h2 className="d-inline">{replyContent.mailTitle}</h2>
            </div>
            <p className="send-time">{formatDate}</p>
            <div className="r-color d-flex">
                <span>첨부 파일</span>
                <div>
                    {
                        contentFile.length > 0 ? (
                            contentFile.map((file, index) => (
                                <a key={index} className="d-block">
                                    <i className="bi bi-files"></i>
                                    <span>{file.mailFileOriName}</span>
                                </a>
                            ))
                        ) : (
                            <span>첨부파일 없음</span>
                        )
                    }
                </div>

            </div>
            <hr />
            <div>
                {replyContent.mailContent}
            </div>
        </div>
    </>
    );
}

export default ReplyMailContent;