import { request } from './Api';
import { GET_SCHEDULE } from '../modules/ScheduleModule';

export const getScheduleAPI = (dptNo) => {
  return async (dispatch) => {
    try {
      const schedules = await request('GET', `/schedules/department/${dptNo}`);
      console.log('getScheduleAPI로 받아온 스케줄 데이터:', schedules); // 데이터 확인
      dispatch({
        type: GET_SCHEDULE,
        payload: schedules
      });
    } catch (error) {
      // console.error('[ScheduleAPICalls중에서 getScheduleAPI 호출 오류: ]', error);
      throw error;
    }
  }; 
};


  

export const insertScheduleAPI = async (newScheduleData) => {
    try {
        alert("[ScheduleAPICalls] 성공했습니다.")
        const response = await request('post', '/schedules/schedules', newScheduleData);
        return response;
    } catch (error) {
        throw new Error('[ScheduleAPICalls] 오류: ', error);
    }
};
