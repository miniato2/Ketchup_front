import React, { useState } from 'react';



export default function PositionForm({ position }) {
    console.log('넘어오는 데이터값? : ', position);
    const [form, setForm] = useState({});

    const positionName = position.positionName;

  



    return (

      
            <div style={{ marginLeft: 50 }}>
                <label>현재 직급명 <input value={positionName} style={{ textAlign: 'center', marginLeft: 50, borderWidth: '0px 0px 1px 0px' }}></input></label>
                <br></br>


                <label>수정후 직급레벨 <select style={{ marginLeft: 20, borderWidth: '0px 0px 1px 0px' }} name="positionLevel">
                    <option value="">직급 레벨 선택</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select></label>


                <label>수정후 직급명
                    <input 
                        defaultValue={positionName}
                        style={{
                            textAlign: 'center',
                            marginLeft: 35,
                            borderWidth: '0px 0px 1px 0px'
                        }}>
                    </input>
                </label>


                <label>수정후 관리권한  
                    <select style={{ marginLeft: 20, borderWidth: '0px 0px 1px 0px' }} name="authority">
                    <option value="">관리 권한 선택</option>
                    <option value="LV1">LV1</option>
                    <option value="LV2">LV2</option>
                    <option value="LV3">LV3</option>
                </select></label>

                <br></br>
                <button style={{ marginLeft: 330 ,marginBottom: 20}}>취소</button>
                <button style={{ marginLeft: 5 }}>저장</button>





            </div>
      


    );
}
