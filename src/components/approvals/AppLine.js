import Table from 'react-bootstrap/Table';
function AppLine({appline}){
    console.log('결재선 리스트', appline)
    return(
        <>
            <Table>
                <thead>
                    <tr>
                        <th scope='col'>구분</th>
                        {appline.map(() => (
                            <th>결재자</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope='row'>직급</th>
                        {appline.map((item) => (
                            <td>{item.alMember.position.positionName}</td>
                        ))}
                    </tr>
                    <tr>
                        <th scope='row'>성명</th>
                        {appline.map((item) => (
                            <td>{item.alMember.memberName}</td>
                        ))}
                    </tr>
                    <tr>
                        <th scope='row'>결재일자</th>
                        {appline.map((item) => (
                            <td>{item.alDate}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default AppLine;