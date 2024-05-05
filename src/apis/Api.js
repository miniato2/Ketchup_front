import axios from 'axios';

export const request = async (url, method, data) => {
    
    try {
        const response = await axios({
            method: method,
            url: url,
            data: data
        });
    } catch (error) {
        console.error('API request 에러: ', error);
        throw error;
    }
}