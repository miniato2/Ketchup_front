import Style from "./AppLine.module.css";


function AppLine({ appline }) {
    console.log('결재선 리스트', appline);

    return (
        <div style={{overflowX: 'auto'}}>
            <table className={Style.appTable}>
                <thead>
                    <tr>
                        <th width={'133px'} style={{ minWidth: '133px'}}>구분</th>
                        {appline.map(() => (
                            <th width={'133px'} style={{ minWidth: '133px'}}>결재자</th>
                        ))}
                        {appline.length < 8 ? <th></th> : null }
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope='row'>직급</th>
                        {appline.map((item) => (
                            <td key={item.index}>{item.alMember.position.positionName}</td>
                        ))}
                        {appline.length < 8 ? <td></td> : null }
                    </tr>
                    <tr>
                        <th scope='row'>성명</th>
                        {appline.map((item) => (
                            <td key={item.index}>{item.alMember.memberName}</td>
                        ))}
                        {appline.length < 8 ? <td></td> : null }
                    </tr>
                    {('alDate' in appline[0]) ? (
                        <tr>
                            <th scope='row'>결재일자</th>
                            {appline.map((item) => (
                                <td key={item.index}>{item.alDate? item.alDate: '-'}</td>
                            ))}
                            {appline.length < 8 ? <td></td> : null }
                        </tr>
                    ) : null}
                </tbody>
            </table>
        </div>
    )
}

export default AppLine;