import axios from 'axios';

const DOMAIN = 'http://localhost:8080';
const TEST_TOKEN = 'eyJkYXRlIjoxNzE1MTI4OTIxMDU5LCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJwb3NpdGlvbk5hbWUiOiLtjIDsnqUiLCJkZXBObyI6NCwibWVtYmVyTm8iOiI0IiwicG9zaXRpb25MZXZlbCI6Miwic3ViIjoia2V0Y2h1cCB0b2tlbiA6IDQiLCJyb2xlIjoiTFYyIiwicG9zaXRpb25TdGF0dXMiOiJZIiwicG9zaXRpb25ObyI6MiwiZXhwIjoxNzE1MjE1MzIxfQ.xzFIzor4kAgBEtNE6R6G8ErB3OdWF-rROoRZvUqDR9M';

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


