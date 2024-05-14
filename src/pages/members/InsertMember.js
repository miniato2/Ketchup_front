import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callRegisterAPI } from "../../apis/MemberAPICalls";
import { useEffect } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import DaumPostcode from 'react-daum-postcode';







function InsertMember() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [Address, setAddress] = useState('주소를 입력해주세요');
    const [isOpen, setIsOpen] = useState('false');
    const [form, setForm] = useState({
        memberNo: '',
        memberPW: '1111',
        status: '재직중',
        imgUrl: 'memberFileName'

    });

    const themeObj = {
        bgColor: '#FFFFFF',
        pageBgColor: '#FFFFFF',
        postcodeTextColor: '#C05850',
        emphTextColor: '#222222',
    };

    const postCodeStyle = {
        width: '360px',
        height: '480px',
    };

    const completeHandler = (data) => {
        const { address } = data;
        setAddress(address);
        setIsOpen(false); // 주소 선택 후에는 주소 입력 폼을 닫음
    };

    const closeHandler = (state) => {
        if (state === 'FORCE_CLOSE') {
            setIsOpen(false);
        } else if (state === 'COMPLETE_CLOSE') {
            setIsOpen(false);
        }
    };

    const toggleHandler = () => {
        setIsOpen((prevOpenState) => !prevOpenState);
    };

    const inputChangeHandler = (event) => {
        setAddress(event.target.value);
    };










    useEffect(() => {
        generateMemberNo();
        setAddress('');
        setIsOpen(false); // 초기화 시 주소 입력 폼을 닫음

    }, []); // 컴포넌트가 처음 렌더링될 때만 실행

    const generateMemberNo = () => {
        const today = new Date();
        const year = today.getFullYear().toString().slice(2); // 연도의 마지막 두 자리
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 월을 두 자리로
        const randomNum = Math.floor(Math.random() * 100) + 10; // 1에서 100 사이의 랜덤 숫자

        const generatedMemberNo = year + month + randomNum;
        setForm(prevForm => ({
            ...prevForm,
            memberNo: generatedMemberNo
        }));
    };


    const [imagePreview, setImagePreview] = useState('/img/needFile.png');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            setForm(prevForm => ({
                ...prevForm,
                memberImage: file
            }));
        };

    };



    const onClickRegistHandler = () => {
        dispatch(callRegisterAPI({	// 로그인
            form: form
        }));


        alert("사원등록이 완료되었습니다.");
        navigate('/members');

    }




    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };






    return (
        
        <main id="main">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2 style={{ marginLeft: '-1000px' }}>사원 등록</h2>
                <label style={{ color: '#878787' }}>사번
                    <input
                        onChange={onChangeHandler}
                        type="text"
                        placeholder="사번"
                        name="memberNo"
                        value={form.memberNo}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                </label>

                <label style={{ color: '#878787' }}>이름
                    <input
                        autoComplete='off'
                        type="text"
                        placeholder="이름"
                        name="memberName"
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                </label>
                <label style={{ color: '#878787' }}>연락처
                    <input
                        autoComplete='off'
                        type="text"
                        placeholder="연락처"
                        name="phone"
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                </label>
                <label style={{ color: '#878787' }}>생년월일
                    <input
                        autoComplete='off'
                        type="date"
                        placeholder="생년월일"
                        name="birthDate"
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                </label>
                <label style={{ color: '#878787' }}>성별
                    <select
                        type="text"
                        name="gender"
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                        defaultValue=""
                    >
                        <option value="">선택</option>
                        <option value="M">남</option>
                        <option value="F">여</option>
                    </select>
                </label>
                <label style={{ color: '#878787' }}>주소
                    <input
                        autoComplete='off'
                        type="text"
                        placeholder="주소"
                        name="address"
                        value={Address}
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    /><button onClick={toggleHandler}>주소 찾기</button>
                </label>
                {isOpen && (
                    <div>
                        <DaumPostcodeEmbed
                            style={{ width: '360px', height: '480px' }}
                            onComplete={completeHandler}
                            onClose={() => setIsOpen(false)} // 닫기 버튼을 클릭한 경우에도 주소 입력 폼을 닫음
                        />
                    </div>
                )}

                
                <label style={{ color: '#878787' }}>이메일
                    <input
                        autoComplete='off'
                        type="text"
                        placeholder="이메일"
                        name="privateEmail"
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                </label>
                <label style={{ color: '#878787' }}>사내메일
                    <input
                        autoComplete='off'
                        type="text"
                        placeholder="사내메일"
                        name="companyEmail"
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                </label>
                <label style={{ color: '#878787' }}>부서번호
                    <input
                        autoComplete='off'
                        type="text"
                        placeholder="부서번호"
                        name="department"
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                </label>
                <label style={{ color: '#878787' }}>직급번호
                    <input
                        autoComplete='off'
                        type="text"
                        placeholder="직급번호"
                        name="position"
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />
                </label>
                <label style={{ color: '#878787' }}>계좌번호

                    {/* <select
                        name="bank"
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px', marginBottom: '20px', padding: '1px', width: '70px', textAlign: 'center' }}
                    >
                        <option value="국민">국민</option>
                        <option value="신한">신한</option>
                        <option value="우리">우리</option>
                        <option value="기업">기업</option>
                        <option value="농협">농협</option>
                        <option value="하나">하나</option>
                        <option value="제일">제일</option>
                    </select> */}
                    <input
                        autoComplete='off'
                        type="text"
                        placeholder="계좌번호"
                        name="account"
                        onChange={onChangeHandler}
                        style={{ borderWidth: '0px 0px 1px 0px', marginBottom: '20px', padding: '5px', width: '400px', textAlign: 'center' }}
                    />

                </label>
                <label style={{ color: '#878787' }}>사원사진
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                        name="memberImage"
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
                            objectFit: 'cover', // 이미지 비율 유지
                            cursor: 'pointer'
                        }}
                    />
                </label>
                <span>
                    <button
                        style={{ backgroundColor: 'white', color: 'black', fontSize: '15px', width: 80, height: '35px', padding: '5px', cursor: 'pointer', marginLeft: '600px', borderRadius: 5 }}
                    >
                        취소
                    </button>
                    <button
                        onClick={onClickRegistHandler}
                        style={{ backgroundColor: 'red', color: 'white', border: 'none', fontSize: '15px', width: 80, height: '35px', padding: '5px', cursor: 'pointer', marginLeft: '10px', borderRadius: 5 }}
                    >
                        등록
                    </button>


                </span>

            </div>


        </main>
    );
}

export default InsertMember;