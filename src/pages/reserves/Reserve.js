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
    const [reserveData, setReserveData] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [searchConditions, setSearchConditions] = useState({
        rscCategory: "",
        rsvDate: ""
    });

    useEffect(() => {
        console.log("reserveData useEffect를 통해서 확인해봄", reserveData);
    }, [reserveData]);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setSearchConditions({
            ...searchConditions,
            [name]: value
        });
    };

    const convertToCalendarProps = (rsvList) => {
        if (rsvList && rsvList.results && rsvList.results.reserve) {
            return rsvList.results.reserve.map(reserve => ({
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
                    <Grid>
                        <h1>자원예약</h1>
                        <Grid item xs={5}>
                            <TextField variant="outlined" name="rscCategory" type="text" onChange={onInputChange} />
                            <TextField variant="outlined" name="rsvDate" type="date" onChange={onInputChange} />
                        </Grid>
                        <Button onClick={onClickSearch}>조회</Button>
                    </Grid>
                </Grid>

                <Grid>
                {reserves && reserves.results && reserves.results.reserve ? (
                        <FullCalendar
                            events={reserveData}
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
            </Box>
        </main>
    );
};