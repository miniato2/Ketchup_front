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
      console.error('[ScheduleAPICalls중에서 getScheduleAPI 호출 오류: ]', error);
      throw error;
    }
  };
};

export const insertScheduleAPI = async (newScheduleData) => {
  try {
    const response = await request('post', '/schedules/schedules', newScheduleData);
    return response;
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    throw new Error(`[ScheduleAPICalls중 insertScheduleAPI] 오류: ${errorMessage}`);
  }
};

export const deleteScheduleAPI = async (skdNo) => {
  try {
    const response = await request('delete', `/schedules/schedules/${skdNo}`);
    alert("일정이 삭제되었습니다.");
    return response;
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    throw new Error(`[ScheduleAPICalls 중 deleteScheduleAPI] 오류: ${errorMessage}`);
  }
};

