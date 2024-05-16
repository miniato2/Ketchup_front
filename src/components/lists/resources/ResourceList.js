import { Table } from "react-bootstrap";

function ResourceList({ list, part }) {
    return (
        <div class="card-body">
            <Table className="table">
                <thead>
                    <tr style={{ textAlign: 'center' }}>
                        <th>
                            <input
                                type="checkbox"
                            />
                        </th>
                        <th>번호</th>
                        {
                            part === 'conferences' ?
                                (<>
                                    <th>회의실 명</th>
                                    <th>위치</th>
                                    <th>수용 가능 인원</th>
                                </>)
                                :
                                (<>
                                    <th>차량 번호</th>
                                    <th>차량</th>
                                    <th>탑승 가능 인원</th>
                                </>)
                        }
                        <th>상태</th>
                        <th>상세</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((rsc, index) =>
                            <tr key={index}>
                                <td style={{ padding: "15px", textAlign: 'center' }}>
                                    <input
                                        type="checkbox" />
                                </td>
                                <td>{rsc.rscNo}</td>
                                {
                                    part === 'conferences' ? 
                                    (<>
                                        <td>{rsc.rscName}</td>
                                        <td>{rsc.rscInfo}</td>
                                    </>) : (<>
                                        <td>{rsc.rscInfo}</td>
                                        <td>{rsc.rscName}</td>
                                    </>)
                                }
                                <td>{rsc.rscCap}명</td>
                                <td>{rsc.rscIsAvailable ? "사용 불가능" : "사용 가능"}</td>
                                <td><button className="back-btn">상세</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </div>
    );
}

export default ResourceList;