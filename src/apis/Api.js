import axios from 'axios';
const DOMAIN = 'http://localhost:8080';
const token = window.localStorage.getItem('accessToken')
// const TEST_TOKEN = 'eyJkYXRlIjoxNzE1MTU4MTM4ODM3LCJ0eXBlIjoiand0IiwiYW…UzOH0.zS2eSUFu3yyN9EMvDzVMkCtYnt4XjGqX0l13V-YhsXE';



export const request = async (method, url, data) => {
    try {
        // API 요청
        const response = await axios({
            method: method,
            url: `${DOMAIN}${url}`,
            data: data,
            headers: {
                'Authorization': `Bearer ${token}`
                // 'Authorization': `Bearer ${TEST_TOKEN}`, // 테스트용 토큰
            }
        });
        return response.data;
    } catch (error) {
        console.error('API request 에러: ', error);
        throw error;
    }
}
