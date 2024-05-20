import { callDepartmentsAPI } from "../../apis/MemberAPICalls";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Table, ToggleButtonGroup } from "react-bootstrap";
import { Radio, ToggleButton } from "@mui/material";




function Departments() {
    const dispatch = useDispatch();
    const departmentsList = useSelector(state => state.departmentReducer);

    console.log(departmentsList);

    useEffect(
        () => {
          
                dispatch(callDepartmentsAPI());

          

        }, []

    );



    return (
        <>
            <main id="main">
                <div >
                    <br></br>
                    <h2>부서 목록</h2>
                   
                    <Table>

                        <thead>
                            <tr>
                                <th>미사용</th>
                                <th>사용</th>
                                <th>부서번호</th>
                                <th>부서명</th>
                                <th>인원수</th>
                                <th>팀장</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(departmentsList) && departmentsList.map((department) => (
                                <tr key={department.depNo} >
                                   
                                  
                                     
                                       

                                 
                                    <td><Radio/></td>
                                    <td><Radio/></td>
                                    <td>{department.depNo}</td>
                                    <td>{department.depName}</td>
                                    <td>{department.number}</td>
                                    <td>{department.leader}</td>
                                  
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                   
                </div>
            </main>
        </>

    );



}

export default Departments;