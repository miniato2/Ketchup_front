import Table from 'react-bootstrap/Table';
function RefLine({refline}){
    console.log('결재선 리스트', refline)
    return(
        <>
            <Table>
                <thead>
                    <tr>
                        <th scope='col'>구분</th>
                        {refline.map(() => (
                            <th>참조자</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope='row'>성명</th>
                        {refline.map((item) => (
                            <td>{item.refMember.memberName}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default RefLine;