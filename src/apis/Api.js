import axios from 'axios';
const DOMAIN = 'http://localhost:8080';
const token = window.localStorage.getItem('accessToken')
const TEST_TOKEN = 'eyJkYXRlIjoxNzE1MTU2MzgxOTgxLCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJwb3NpdGlvbk5hbWUiOiLtjIDsnqUiLCJkZXBObyI6NSwibWVtYmVyTm8iOiI1IiwicG9zaXRpb25MZXZlbCI6Miwic3ViIjoia2V0Y2h1cCB0b2tlbiA6IDUiLCJyb2xlIjoiTFYyIiwicG9zaXRpb25TdGF0dXMiOiJZIiwibWVtYmVyTmFtZSI6Iuq5gO2YhOyngCIsInBvc2l0aW9uTm8iOjIsImV4cCI6MTcxNTI0Mjc4MX0.A6kaRJMogArV80PAREVEVbygSwhRXJGpHRrO04vZHTc';


export const request = async (method, url, data) => {
    try {
        // API 요청
        const response = await axios({
            method: method,
            url: `${DOMAIN}${url}`,
            data: data,
            headers: {
                'Authorization': `Bearer ${TEST_TOKEN}` // 테스트용 토큰 사용
            }
        });
        return response.data;
    } catch (error) {
        console.error('API request 에러: ', error);
        throw error;
    }
}
