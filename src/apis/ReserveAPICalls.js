import { request } from "./Api";
import {GET_RESERVE} from '../modules/ReserveModule';

export async function getReserveAPI(rscCategory, rsvDate) {
    try {
        const response = await fetch(`/reserves?category=${rscCategory}&date=${rsvDate}`);
        if (!response.ok) {
            throw new Error('getReserveAPI중 네트워크 에러 발생');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('getReserveAPI중 에러발생:', error);
        throw error;
    }
}
