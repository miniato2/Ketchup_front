import axios from 'axios';

const DOMAIN = 'http://localhost:8080';
const TEST_TOKEN = 'eyJkYXRlIjoxNzE1MTMwMjc4MjI4LCJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJwb3NpdGlvbk5hbWUiOiLtjIDsnqUiLCJkZXBObyI6NSwibWVtYmVyTm8iOiI1IiwicG9zaXRpb25MZXZlbCI6Miwic3ViIjoia2V0Y2h1cCB0b2tlbiA6IDUiLCJyb2xlIjoiTFYyIiwicG9zaXRpb25TdGF0dXMiOiJZIiwicG9zaXRpb25ObyI6MiwiZXhwIjoxNzE1MjE2Njc4fQ.4KtDg3lZ7bdgJWSpEY6tNkqB-cQYRcI8kwncwqYBKMc';

// export const request = async (method, url, data) => {
//     try {
//         // API 요청
//         const response = await axios({
//             method: method,
//             url: `${DOMAIN}${url}`,
//             data: data,
//             headers: {
//                 'Authorization': `Bearer ${TEST_TOKEN}`, // 테스트용 토큰 사용
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error('API request 에러: ', error);
//         throw error;
//     }
// }


export const request = async (method, url, data) => {
    try {
        let headers = {
            'Authorization': `Bearer ${TEST_TOKEN}`, // 테스트용 토큰 사용
            'Content-Type': 'multipart/form-data', // Content-Type 설정 추가
        };

        // // 파일 업로드를 위한 경우에는 Content-Type을 따로 설정해야 합니다.
        // if (data instanceof FormData) {
        //     // FormData를 사용할 경우 별도로 Content-Type을 설정하지 않아도 됩니다.
        // } else {
        //     headers['Content-Type'] = 'application/json';
        // }

        // API 요청
        const response = await axios({
            method: method,
            url: `${DOMAIN}${url}`,
            data: data,
            headers: headers
        });
        return response.data;
    } catch (error) {
        console.error('API request 에러: ', error);
        throw error;
    }
}