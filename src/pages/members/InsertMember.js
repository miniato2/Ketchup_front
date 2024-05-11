import { useState } from "react";


function InsertMember() {

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



    return (
        <main id="main">
        <div 
            
            style={ { backgroundColor: 'white' } }
        >

            { 
            
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h1 style={{marginLeft: '-1400px'}}>사원 등록</h1>

                <label style={{color: '#878787'}}>사번
                <input 
                    type="text" 
                    placeholder="사번" 
                  
                    
                    style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px',textAlign: 'center'}}
                />
                </label>
                 <label style={{color: '#878787'}}>이름
                <input 
                    type="text" 
                    placeholder="이름" 
                    
                   
                    style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px',width: '400px', textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>생년월일
                <input 
                    type="text" 
                    placeholder="생년월일" 
                    
                    
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>성별
                <input 
                    type="text" 
                    placeholder="성별" 
                    
                   
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>주소
                <input 
                    type="text" 
                    placeholder="주소" 
                    
                    
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>이메일
                <input 
                    type="text" 
                    placeholder="이메일" 
                   
                   
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>사내메일
                <input 
                    type="text" 
                    placeholder="사내메일" 
                   
                   
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>부서
                <input 
                    type="text" 
                    placeholder="부서명" 
                   
                    
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>직급
                <input 
                    type="text" 
                    placeholder="직급명" 
                   
                   
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>계좌번호
                <input 
                    type="text" 
                    placeholder="계좌번호" 
                   
                   
                    style={{ borderWidth: '0px 0px 1px 0px',  marginBottom: '20px', padding: '5px',width: '400px',textAlign: 'center'}}
                />
                </label>
                <label style={{color: '#878787'}}>사원사진
                        <input 
                            type="file" 
                            onChange={handleImageUpload}
                            accept="image/*"
                            style={{ display: 'none' }} // 기존 스타일 수정
                        />
                        <img 
                            src={imagePreview} 
                            alt="사원사진 미리보기" 
                            style={{ 
                                borderWidth: '0px 0px 1px 0px',  
                                marginBottom: '20px', 
                                padding: '5px', 
                                width: '200px', 
                                height: '200px', 
                                objectFit: 'cover' // 이미지 비율 유지
                            }} 
                        />
                    </label>

               
            </div>

            }
        </div>
        </main>
    );
}

export default InsertMember;