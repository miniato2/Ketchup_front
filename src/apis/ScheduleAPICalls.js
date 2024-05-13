import { request } from './Api';
import { GET_SCHEDULE } from '../modules/ScheduleModule';

export const getScheduleAPI = (dptNo) => {
  return async (dispatch) => {
    try {
      const schedules = await request('GET', `/schedules/department/${dptNo}`);
      dispatch({
        type: GET_SCHEDULE,
        payload: schedules
      });
    } catch (error) {
      const errorMessage = error.response ? error.response.data.message : error.message;
      console.log("일정 정보 조회에 실패하였습니다.");
      throw new Error(`[ScheduleAPICalls중 insertScheduleAPI] 오류: ${errorMessage}`);
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

export const updateScheduleAPI = async (skdNo, updatedScheduleData) => {
  console.log("업데이트할 일정 번호:", skdNo);
  console.log("업데이트할 일정 데이터:", updatedScheduleData);

  try {
    const response = await request('put', `/schedules/schedules/${skdNo}`, updatedScheduleData);
    return response;
  } catch (error) {
    alert("수정에 실패하였습니다. updateScheduleAPI 오류");
    const errorMessage = error.response ? error.response.data.message : error.message;
    throw new Error(`[ScheduleAPICalls중 updateScheduleAPI] 오류: ${errorMessage}`);
  }
};

export const deleteScheduleAPI = async (skdNo) => {
  try {
    const response = await request('delete', `/schedules/schedules/${skdNo}`);
    return response;
  } catch (error) {
    const errorMessage = error.response ? error.response.data.message : error.message;
    throw new Error(`[ScheduleAPICalls 중 deleteScheduleAPI] 오류: ${errorMessage}`);
  }
};