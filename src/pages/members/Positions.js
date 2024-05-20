import { callPositionsAPI } from "../../apis/MemberAPICalls";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Table, ToggleButtonGroup } from "react-bootstrap";
import { Radio, ToggleButton } from "@mui/material";



function Positions() {

    const dispatch = useDispatch();
    const positionList = useSelector(state => state.positionReducer);

    console.log(positionList);

    useEffect(
        () => {
          
                dispatch(callPositionsAPI());

          

        }, []

    );


    return (
        <>
            <main id="main">
                <div >
                    <br></br>
                    <h2>직급 목록</h2>
                   
                    <Table>

                        <thead>
                            <tr>
                                <th>미사용</th>
                                <th>사용</th>
                                <th>직급명</th>
                                <th>직급레벨</th>
                                <th>관리권한</th>
                                <th>직급수정</th>
                                <th>직급삭제</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(positionList) && positionList.map((position) => (
                                <tr key={position.positionNo} >
                                   
                                  
                                     
                                       

                                 
                                    <td><Radio/></td>
                                    <td><Radio/></td>
                                    <td>{position.positionName}</td>
                                    <td>{position.positionLevel}</td>
                                    <td>{position.authority}</td>
                                    <td><button>수정</button></td>
                                    <td><button>삭제</button></td>
                                   
                                  
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                   
                </div>
            </main>
        </>

    );






}

export default Positions;