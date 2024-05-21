import axios from 'axios';
const DOMAIN = 'http://localhost:8080';


export const request = async (method, url, data) => {
    try {
        // API 요청
        const token = window.localStorage.getItem('accessToken')
        const response = await axios({
            method: method,
            url: `${DOMAIN}${url}`,
            data: data,
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data' // 추가

            }
        });
        return response.data;
    } catch (error) {
        console.error('API request 에러: ', error);
        throw error;
    }
};

export const multipartRequest = async (method, url, data) => {
    try {
   
        const token = window.localStorage.getItem('accessToken')
        const response = await axios({
            method: method,
            url: `${DOMAIN}${url}`,
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': '*/*',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('API request 에러: ', error);
        throw error;
    }
};
