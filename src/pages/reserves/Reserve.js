import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Calendar from "../schedules/calendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import { getReserveAPI } from "../../apis/ReserveAPICalls";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

export default function Reserve() {
    const dispatch = useDispatch();
    const reserves = useSelector(state => state.reserveReducer);
    console.log("reserves값 확인", reserves);
    const [reserveDataList, setReserveDataList] = useState([]);
    const [reserveData, setReserveData] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [searchConditions, setSearchConditions] = useState({
        rscCategory: "",
        rsvDate: ""
    });

    // 새로 추가함. 배열로 계속해서 반복시키기 위해서
    useEffect(() => {
        if (reserves && reserves.results && reserves.results.reserve) {
            // 각 예약을 convertToCalendarProps를 사용하여 변환한 뒤, 결과 배열을 평탄화합니다.
            const convertedReserveDataList = reserves.results.reserve.map(reserve => convertToCalendarProps(reserve)).flat();
            setReserveData(convertedReserveDataList);
        }
    }, [reserves]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setSearchConditions({
            ...searchConditions,
            [name]: value
        });
    };

    // const convertToCalendarProps = (rsvList) => {
    //     if (rsvList && rsvList.results && rsvList.results.reserve) {
    //         return rsvList.results.reserve.map(reserve => ({
    //             title: reserve.rsvDescr,
    //             start: moment(reserve.rsvStartDttm, 'YYYY-MM-DD A h:mm').toDate(),
    //             end: moment(reserve.rsvEndDttm, 'YYYY-MM-DD A h:mm').toDate(),
    //             id: reserve.rsvNo,
    //             extendedProps: {
    //                 rsvDescr: reserve.rsvDescr,
    //                 reserver: reserve.reserver,
    //                 resources: {
    //                     rscNo: reserve.resources.rscNo,
    //                     rscCategory: reserve.resources.rscCategory,
    //                     rscName: reserve.resources.rscName,
    //                     rscInfo: reserve.resources.rscInfo,
    //                     rscCap: reserve.resources.rscCap,
    //                     rscIsAvailable: reserve.resources.rscIsAvailable,
    //                     rscDescr: reserve.resources.rscDescr
    //                 }
    //             }
    //         }));
    //     } else {
    //         console.log("reserves가 존재하지 않거나 올바른 형식이 아닙니다.", rsvList);
    //         return [];
    //     }
    // };
    const convertToCalendarProps = (rsvList) => {
        if (rsvList && rsvList.length > 0) {
            return rsvList.map(reserve => ({
                title: reserve.rsvDescr,
                start: moment(reserve.rsvStartDttm, 'YYYY-MM-DD A h:mm').toDate(),
                end: moment(reserve.rsvEndDttm, 'YYYY-MM-DD A h:mm').toDate(),
                id: reserve.rsvNo,
                extendedProps: {
                    rsvDescr: reserve.rsvDescr,
                    reserver: reserve.reserver,
                    resources: {
                        rscNo: reserve.resources.rscNo,
                        rscCategory: reserve.resources.rscCategory,
                        rscName: reserve.resources.rscName,
                        rscInfo: reserve.resources.rscInfo,
                        rscCap: reserve.resources.rscCap,
                        rscIsAvailable: reserve.resources.rscIsAvailable,
                        rscDescr: reserve.resources.rscDescr
                    }
                }
            }));
        } else {
            console.log("reserves가 존재하지 않거나 올바른 형식이 아닙니다.", rsvList);
            return [];
        }
    };

    const fetchReserves = () => {
        try {
            const { rscCategory, rsvDate } = searchConditions;
            if (!rsvDate) {
                throw new Error("날짜를 입력해주세요.");
            }
            dispatch(getReserveAPI(rscCategory, rsvDate));
            const convertedReserves = convertToCalendarProps(reserves);
            setReserveData(convertedReserves);
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : error.message;
            console.error('fetchReserves 함수 도중 에러 발생:', errorMessage);
        }
    };

    useEffect(() => {
        fetchReserves();
    }, [searchConditions]);

    const onClickSearch = () => {
        fetchReserves();
        setSearchClicked(true);
    }

    return (
        <main id="main" className="main">
            <Box p={2}>
                <Grid container spacing={2}>
                    <Grid justifyContent={'center'}>
                        <h1 style={{ marginTop: 15 }}>자원예약</h1>
                        <Grid item xs={5}>
                            <TextField variant="outlined" name="rscCategory" type="text" onChange={onInputChange} />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField variant="outlined" name="rsvDate" type="date" onChange={onInputChange} />
                        </Grid>
                        <Button onClick={onClickSearch}>조회</Button>
                    </Grid>
                </Grid>
                {searchClicked ? (
                    <Grid container spacing={2}>
                        {reserveDataList.map((reserveData, index) => (
                            <Grid item xs={12} key={index}> {/* index를 키로 사용하여 고유성 보장 */}
                                {reserveData.length > 0 ? ( // reserveData 대신 reserveDataList를 사용해야 합니다.
                                    <FullCalendar
                                        events={reserveData} // 이 부분은 reserveDataList의 각 아이템을 참조해야 합니다.
                                        initialView="dayGridDay"
                                        plugins={[
                                            dayGridPlugin,
                                            timeGridPlugin,
                                            interactionPlugin,
                                            listPlugin
                                        ]}
                                        height="50vh"
                                    />
                                    
                                ) : (
                                    <Typography>조회된 예약 정보가 없습니다.</Typography>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography fontSize={38}>검색 조건을 입력하여 검색해주세요.</Typography>
                )}
            </Box>
        </main>
    );
};