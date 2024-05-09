import axios from 'axios';
const DOMAIN = 'http://localhost:8080';
const token = window.localStorage.getItem('accessToken')
const TEST_TOKEN = 'eyJkYXRlIjoxNzE1MTYwNDYwMzA0LCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJwb3NpdGlvbk5hbWUiOiLsp4Hsm5AiLCJkZXBObyI6MSwibWVtYmVyTm8iOiIxIiwicG9zaXRpb25MZXZlbCI6MSwic3ViIjoia2V0Y2h1cCB0b2tlbiA6IDEiLCJyb2xlIjoiTFYxIiwicG9zaXRpb25TdGF0dXMiOiJZIiwibWVtYmVyTmFtZSI6IuydtO2bhOyYgSIsInBvc2l0aW9uTm8iOjEsImV4cCI6MTcxNTI0Njg2MH0.juJ_AVUZYZLQZ12bLgynFWUautqEfdEdxL7992FDIpU'


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
