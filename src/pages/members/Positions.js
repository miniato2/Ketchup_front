import { callPositionsAPI, callAddPositionAPI, callDeletePositionAPI, callUpdatePositionStatusAPI,callAllPositionsAPI } from "../../apis/MemberAPICalls"; // addPosition 추가
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Table, ToggleButtonGroup } from "react-bootstrap";
import { Dialog, DialogTitle, Radio, ToggleButton } from "@mui/material";
import ButtonGroup from "../../components/contents/ButtonGroup";
import PositionForm from "../../components/form/PositionForm";
import { useNavigate } from "react-router-dom";

function Positions() {


    const dispatch = useDispatch();
    const { positionList, update } = useSelector(state => state.positionReducer);
  
    const [positionDialogOpen, setPositionDialogOpen] = useState(false);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedPositionNos, setSelectedPositionNos] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [newPosition, setNewPosition] = useState({ positionName: "", positionLevel: "", authority: "", positionStatus: "Y" });

    console.log(useSelector(state => state.positionReducer));
    
    useEffect(() => {
        dispatch(callAllPositionsAPI());
    }, [update]);


    const onDialogClickHandler = () => {
        setPositionDialogOpen(prevState => !prevState);
    };


    const handleEditClick = (position) => {
        setSelectedPosition(position);
        onDialogClickHandler(); // 다이얼로그 열기
    }
    const handleRadioClick = (positionNo, status) => {
        setSelectedPositionNos(prevState => ({
            ...prevState,
            [positionNo]: status
        }));


    };


    const handleEditModeToggle = () => {
        setIsEditMode(prevState => !prevState);
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPosition(prevState => ({
            ...prevState,
            [name]: value
        }));
    }


    const addPosition = async () => {
        await dispatch(callAddPositionAPI(newPosition));
        setIsEditMode(false);
        await dispatch(callPositionsAPI());
    }

    const cancelEdit = () => {
        setIsEditMode(false);
        setNewPosition({ positionName: "", positionLevel: "", authority: "" });
       
    }

    const deletePosition = async (positionNo) => {
        await dispatch(callDeletePositionAPI(positionNo));
        await dispatch(callPositionsAPI());
    }

    const changePositionStatus = (positionNo) =>{
        dispatch(callUpdatePositionStatusAPI(positionNo))

    }



    return (
        <>
            <main id="main">
                <div>
                    <br />
                    <h2>직급 목록</h2>
                    <ButtonGroup buttons={[{ label: '등록', styleClass: 'move', onClick: handleEditModeToggle }]} />
                    <br />
                    <br />

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
                                <tr key={position?.positionNo}>
                                    <td>
                                        <Radio
                                            name={`positionStatus-${position?.positionNo}`}
                                            checked={position.positionStatus === 'N'}
                                            onClick={() => dispatch(callUpdatePositionStatusAPI(position.positionNo))} // 누르는 버튼에 따라 false 전달
                                        />
                                    </td>
                                    <td>
                                        <Radio
                                            name={`positionStatus-${position?.positionNo}`}
                                            checked={position.positionStatus === 'Y'}
                                            onClick={() => dispatch(callUpdatePositionStatusAPI(position.positionNo))} // 누르는 버튼에 따라 true 전달
                                        />
                                    </td>
                                    <td>{position && position.positionName}</td>
                                    <td>{position && position.positionLevel}</td>
                                    <td>{position && position.authority}</td>
                                    <td><button onClick={() => handleEditClick(position)}>수정</button></td>
                                    <td><button onClick={() => deletePosition(position.positionNo)}>삭제</button></td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Dialog open={positionDialogOpen} onClose={onDialogClickHandler}>
                        <DialogTitle>직급 수정</DialogTitle>
                        <PositionForm position={selectedPosition} />
                    </Dialog>
                    {isEditMode &&
                        <div>
                            <input style={{ marginLeft: 400 }} type="text" name="positionName" placeholder="직급명" onChange={handleInputChange} />
                            <select style={{ marginLeft: 55 }} name="positionLevel" onChange={handleInputChange}>
                                <option value="">직급 레벨 선택</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <select style={{ marginLeft: 100 }} name="authority" onChange={handleInputChange}>
                                <option value="">관리 권한 선택</option>
                                <option value="LV1">LV1</option>
                                <option value="LV2">LV2</option>
                                <option value="LV3">LV3</option>
                            </select>
                            <button style={{ marginLeft: 55 }} onClick={cancelEdit}>취소</button>
                            <button style={{ marginLeft: 55 }} onClick={addPosition}>추가</button>
                        </div>
                    }
                </div>


            </main>
        </>
    );
}


export default Positions;