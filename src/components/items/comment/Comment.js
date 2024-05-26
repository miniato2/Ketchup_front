import { margin } from '@mui/system';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Comment({ boardNo }) {


    return (
        <>
            <div style={{ marginTop: "20px", border: "1px solid lightgray", height: "500px" }}>

                <div>
                    <i style={{ marginLeft: "10px" }} className="bi bi-chat-text"></i>
                    <span>  2개의 댓글 모두 보기</span>
                </div>

                <div style={{ borderTop: '0.5px solid lightgray' }} >
                    <div style={{ marginLeft: "10px" }} >
                        <div>
                            <span>김현지</span>&nbsp;
                            <span>팀장</span>&nbsp;&nbsp;
                            <span>2024-05-17(금) 16:25</span>

                            <span>답글</span>
                            <span>삭제</span>
                        </div>
                        <p>
                            댓글 등록합니다. <br />
                            댓글 등록합니다. 확인 부탁합니다.
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Comment;