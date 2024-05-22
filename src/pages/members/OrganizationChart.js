import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callMembersAPI, callDepartmentsAPI, callPositionsAPI } from "../../apis/MemberAPICalls";
import { Table } from "react-bootstrap";

function OrganizationChart() {
    const dispatch = useDispatch();
    const members = useSelector(state => state.memberReducer);
    const departments = useSelector(state => state.departmentReducer);
    const positions = useSelector(state => state.positionReducer);

    useEffect(() => {
        dispatch(callMembersAPI());
        dispatch(callDepartmentsAPI());
        dispatch(callPositionsAPI());
    }, []);

    return (
        <main id="main">
            <div>
                <h2>조직도</h2>
                <div className="search" style={{ width: 100, marginLeft: 1350 }}></div>
                <Table>
                    <thead>
                        <tr>
                            <th>부서</th>
                            <th>직원 목록</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((department) => (
                            <tr key={department.depNo}>
                                <td>{department.depName}</td>
                                <td>
                                    <ul>
                                        {Array.isArray(members) && members
                                            .filter((member) => member.department.depNo === department.depNo)
                                            .sort((a, b) => b.position.positionLevel - a.position.positionLevel)
                                            .map((member) => (
                                                <li key={member.memberNo}>
                                                    {member.memberName} {member.position.positionName}
                                                </li>
                                            ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </main>
    );
}

export default OrganizationChart;