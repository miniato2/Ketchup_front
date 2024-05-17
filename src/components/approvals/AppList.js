import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';


function AppList({ data }) {
    const column = ['상태', '구분', '제목', '기안자', '기안일자', '결재일자'];
    const navigate = useNavigate();

    const onClickHandler = (approvalNo) => {
        navigate(`/approvals/${approvalNo}`, {replace:false})
    }

    return (
        <>
            <Table className="table">
                <thead>
                    <tr style={{ textAlign: 'center' }}>
                        {column.map((item) => (
                            <th scope='col' style={item === '제목' ? { width: '50%', padding: "10px" } : { padding: "10px", width: '10%' }} key={item.index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.map((item) => (
                        <tr style={item.key === '제목' ? { padding: "10px", width: '50%', verticalAlign: 'middle' } : { padding: "10px", width: '10%', verticalAlign: 'middle'}} key={item.index}
                        onClick={() => onClickHandler(item.approvalNo)}>
                            <td>{item.appStatus}</td>
                            <td>{item.form.formName}</td>
                            <td style={{ textAlign: 'left' }}>
                                {item.appTitle}<br />
                                {Array.isArray(item.appLineList) && item.appLineList.map((appLine, index) => (
                                    <span key={index} style={appLine.alSequence === item.sequence? {color: 'red'} : {}}>
                                        {appLine.alMember.memberName}
                                        {index !== item.appLineList.length - 1 && <span style={{color: 'black'}}>-</span>}
                                    </span>
                                ))}
                            </td>
                            <td>{item.member.memberName}</td>
                            <td>{item.appDate}</td>
                            <td>{item.alDate? item.appFinalDate : '-'}</td>
                        </tr>
                    ))}
                    {Array.isArray(data) && data.length === 0 && 
                    <tr>
                        <td colSpan={6} style={{textAlign:"center", color: "#999797"}}>
                            목록을 찾을 수 없습니다.
                        </td>
                    </tr>
                    }
                </tbody>
            </Table>
        </>
    )
}

export default AppList;