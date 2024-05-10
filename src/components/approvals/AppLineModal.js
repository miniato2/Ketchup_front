import { useEffect, useState } from 'react';
import AppModalCss from './AppModal.module.css';
import Style from "./AppLine.module.css";

function AppLineModal({ setModalControl }) {
    const column = ['순번', '부서', '이름', '직급', '구분'];

    const [appLine, setAppLine] = useState([{
        
    }])

    useEffect(() => {
        //사원 호출
    },[])


    return (
        <div className={AppModalCss.appModal}>
            <div className={AppModalCss.appModalBox}>
                <h1>결재선 추가</h1>
                <div className={AppModalCss.appModalContents}>
                    <div className={AppModalCss.members}>
                        <h5>조직도</h5>
                        <div>
                            d

                        </div>
                    </div>
                    <div>
                        버튼
                    </div>
                    <div className={AppModalCss.appMem}>
                        <h5>결재자</h5>
                        <table className={Style.appTable}>
                            <thead>
                                <tr>
                                    {column.map((item) => (
                                        <th scope='col' key={item.index}>{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        d

                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={AppModalCss.appBtns}>
                    <button className="back-btn" onClick={() => setModalControl({ appLineModal: false, refLineModal: false })}>취소</button>
                    <button className="move-btn" onClick={() => setModalControl({ appLineModal: false, refLineModal: false })}>등록</button>
                </div>
            </div>
        </div>
    )
}

export default AppLineModal;