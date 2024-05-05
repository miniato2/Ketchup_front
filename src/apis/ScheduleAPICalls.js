import { request } from './Api';

export const insertScheduleAPI = async (newScheduleData) => {
    try {
        alert("[ScheduleAPICalls] 성공했습니다.")
        // const response = await request('http://localhost:8080/schedules', 'post', newScheduleData);
    } catch (error) {
        throw new Error('[ScheduleAPICalls] 오류: ', error);
    }
};