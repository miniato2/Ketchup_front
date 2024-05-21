import React, { useState } from 'react';



export default function PositionForm({ position }) {
    console.log('넘어오는 데이터값? : ', position);
    const [form,setForm] = useState({});

    const positionName = position.positionName;



    return (

        <form >
            <div style={{marginLeft: 50 }}>
                <label>현재 직급명 <input value={positionName} style={{textAlign: 'center'}}></input></label>
                <br></br>
                <label>수정후 직급레벨 <input deafaultValue={positionName} style={{textAlign: 'center'}} ></input></label>
                <label>수정후 직급명 <input deafaultValue={positionName} style={{textAlign: 'center'}}></input></label>
                <label>수정후 관리권한 <input deafaultValue={positionName} style={{textAlign: 'center'}}></input></label>
                <br></br>
                <button style={{marginLeft: 350}}>취소</button>
                <button>저장</button>

               
                


            </div>
        </form>


    );
}
