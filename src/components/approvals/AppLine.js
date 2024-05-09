import Style from "./AppLine.module.css";


function AppLine({appline}){
    console.log('결재선 리스트', appline);

    return(
        <>
            <table className={Style.appTable}>
                <thead>
                    <tr>
                        <th scope='col' width={'12%'}>구분</th>
                        {appline.map(() => (
                            <th width={'12%'}>결재자</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope='row'>직급</th>
                        {appline.map((item) => (
                            <td className='ap'>{item.alMember.position.positionName}</td>
                        ))}
                        <td></td>
                    </tr>
                    <tr>
                        <th scope='row'>성명</th>
                        {appline.map((item) => (
                            <td className='ap'>{item.alMember.memberName}</td>
                        ))}
                        <td></td>
                    </tr>
                    <tr>
                        <th scope='row'>결재일자</th>
                        {appline.map((item) => (
                            <td className='ap'>{item.alDate}</td>
                        ))}
                        <td></td>
                    </tr>
                </tbody>
            </table>


        </>
    )
}

export default AppLine;