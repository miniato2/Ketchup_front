import Style from "./AppLine.module.css";

function RefLine({refline}){
    console.log('결재선 리스트', refline)
    return(
        <>
            <table className={Style.appTable}>
                <thead>
                    <tr>
                        <th scope='col' width={'12%'}>구분</th>
                        {refline.map(() => (
                            <th width={'12%'} >참조자</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope='row'>성명</th>
                        {refline.map((item) => (
                            <td key={item.index}>{item.refMember.memberName}</td>
                        ))}
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default RefLine;