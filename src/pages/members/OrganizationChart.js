import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callMembersAPI, callDepartmentsAPI, callPositionsAPI,callAllPositionsAPI } from "../../apis/MemberAPICalls";
import { Table,Card,ListGroup } from "react-bootstrap";

function OrganizationChart() {
    const dispatch = useDispatch();
    const members = useSelector(state => state.memberReducer);
    const departments = useSelector(state => state.departmentReducer);
    const positions = useSelector(state => state.positionReducer);

    useEffect(() => {
        dispatch(callMembersAPI());
        dispatch(callDepartmentsAPI());
        dispatch(callAllPositionsAPI());
    }, []);

    return (
        <main id="main">
            <div className="container">
                <h2>조직도</h2>
                <h3>대표 남윤진</h3>
                <div className="row">
                    {departments.map((department) => (
                        <div key={department.depNo} className="col-md-4 mb-4">
                            <Card>
                                <Card.Header>{department.depName}</Card.Header>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        {Array.isArray(members) && members
                                            .filter((member) => member.department.depNo === department.depNo)
                                            .sort((a, b) => b.position.positionLevel - a.position.positionLevel)
                                            .map((member) => (
                                                <ListGroup.Item key={member.memberNo}>
                                                    {member.memberName} - {member.position.positionName}
                                                </ListGroup.Item>
                                            ))}
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default OrganizationChart;