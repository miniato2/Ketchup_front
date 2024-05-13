import { request } from './Api';
import {GET_RESERVE} from '../modules/ReserveModule'

export const getReserveAPI = (rscCategory, rsvDate) => {

    return async (dispatch) => {
        try {
            const reserves = await request('GET', `/reserves?category=${rscCategory}&date=${rsvDate}`);
            dispatch({
                type: GET_RESERVE,
                payload: reserves
            });
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            throw new Error(`ReserveAPICall중 getReserveAPI 오류: ${errorMessage}`);
        }
    };
};
