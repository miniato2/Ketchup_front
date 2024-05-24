import { useState } from "react";
import "./mail.css";
import ReceiveMail from "../../components/lists/mails/ReceiveMail";
import SendMail from "../../components/lists/mails/SendMail";
import { useNavigate, useParams } from "react-router-dom";
import SearchBarValue from "../../components/contents/SearchBarValue";
import MailDeleteModal from "../../components/items/mails/MailDeleteModal";
import { Dialog } from "@mui/material";

function Mail() {
    const navigate = useNavigate();
    const { part } = useParams();
    const [sendMailNos, setSendMailNos] = useState([]);
    const [receiveMailNos, setReceiveMailNos] = useState([])
    const [deleteModal, setDeleteModal] = useState(false);
    const [searchCondition, setSearchCondition] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    console.log(receiveMailNos);

    const receiveHandler = () => {
        navigate('/mails/receive');
    };

    const sendHandler = () => {
        navigate('/mails/send');
    };

    const insertHandler = () => navigate('/mails/insert');

    const openDeleteModal = () => {
        setDeleteModal(true);
    };

    const onDialogCloseHandler = () => {
        setDeleteModal(prevState => !prevState);
    };

    const handleSearch = ({ condition, value }) => {
        setSearchCondition(condition);
        setSearchValue(value);
    };

    const delMailList = part === 'receive' ?
        Object.keys(receiveMailNos).filter(key => receiveMailNos[key]).map(Number)
        : Object.keys(sendMailNos).filter(key => sendMailNos[key]).map(Number);

    const setDelMailList = part === 'receive' ? setReceiveMailNos : setSendMailNos;

    return (
        <>
            <main id="main" className="main">
                <div className="title">
                    <h2>메일</h2>
                    <SearchBarValue
                        searchCondition={searchCondition}
                        setSearchCondition={setSearchCondition}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onSearch={handleSearch} />
                </div>
                <div className="my-3 d-flex justify-content-between">
                    <div className="mail-btn">
                        <button
                            className={`${part == "receive" ? 'focus-btn ps-0 me-4 fs-5' : 'non-focus-btn ps-0 me-4 fs-5'}`}
                            onClick={() => receiveHandler()}>받은 메일함</button>
                        <button
                            className={`${part == "send" ? 'focus-btn fs-5' : 'non-focus-btn fs-5'}`}
                            onClick={() => sendHandler()}>보낸 메일함</button>
                    </div>
                    <div>
                        <button className="back-btn" onClick={openDeleteModal}>삭제</button>
                        <button className="move-btn" onClick={insertHandler}>메일 쓰기</button>
                    </div>
                </div>
                {
                    part == "receive" ?
                        <ReceiveMail
                            checkedItems={receiveMailNos}
                            setCheckedItems={setReceiveMailNos}
                            searchCondition={searchCondition}
                            searchValue={searchValue}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading} />
                        :
                        <SendMail
                            checkedItems={sendMailNos}
                            setCheckedItems={setSendMailNos}
                            searchCondition={searchCondition}
                            searchValue={searchValue}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}  />
                }
            </main>

            {/* {deleteModal ? 
                <MailDeleteModal 
                    setDeleteModal={setDeleteModal} 
                    part={part}
                    delMailList={delMailList}
                    setDelMailList={setDelMailList} /> : null} */}

            <Dialog open={deleteModal} onClose={onDialogCloseHandler}>
                    <MailDeleteModal
                        setDeleteModal={setDeleteModal}
                        part={part}
                        delMailList={delMailList}
                        setDelMailList={setDelMailList} />
            </Dialog>
        </>
    );
}

export default Mail;