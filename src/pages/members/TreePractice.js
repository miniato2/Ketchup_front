import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callMembersAPI, callDepartmentsAPI, callPositionsAPI,callAllPositionsAPI } from "../../apis/MemberAPICalls";
import Tree from 'react-d3-tree';


function OrganizationChart() {
    const dispatch = useDispatch();
    const members = useSelector(state => state.memberReducer);
    const departments = useSelector(state => state.departmentReducer);
    const positions = useSelector(state => state.positionReducer);
    const [treeData, setTreeData] = useState([]);


    useEffect(() => {
        dispatch(callMembersAPI());
        dispatch(callDepartmentsAPI());
        dispatch(callAllPositionsAPI());
    }, []);





    useEffect(() => {
        if (members.length > 0 && departments.length > 0 && positions.length > 0) {
            const data = {
                name: '남윤진대표',
                children: departments.map((department) => ({
                    name: department.depName,
                    children: members
                        .filter((member) => member.department.depNo === department.depNo)
                        .sort((a, b) => b.position.positionLevel - a.position.positionLevel)
                        .filter((member) => !(member.position.positionName === '대표'))
                        .map((member) => ({
                           
                            name: `${member.memberName}${member.position.positionName}`
                           
                        }))
                       
                }))
            };

            setTreeData([data]);
            console.log(data);
        }
    }, [members, departments, positions]);

    const containerStyles = {
        width: '100%',
        height: '200vh',
    };

    const renderCustomNodeElement = ({ nodeDatum }) => (
        <g>
            <rect width="150" height="50" x="-75" y="-25" fill="white" stroke="black" strokeWidth="1" />
            <text fill="black" x="0" y="0" textAnchor="middle" alignmentBaseline="middle">
                {nodeDatum.name}
            </text>
        </g>
    );









    return (
        <main id="main">
            <div className="container">
                <h2>조직도</h2>
                <div style={containerStyles}>
                    {treeData.length > 0 && (
                        <Tree
                            data={treeData}
                            orientation="vertical"
                            translate={{ x: 600, y: 200 }}
                            pathFunc="elbow"
                            renderCustomNodeElement={renderCustomNodeElement}
                            nodeSize={{ x: 200, y: 150 }}
                            separation= {{ siblings: 1, nonSiblings: 1} }
                        />
                    )}
                </div>
            </div>
        </main>
    );
}

export default OrganizationChart;